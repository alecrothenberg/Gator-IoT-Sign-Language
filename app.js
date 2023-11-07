const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

AWS.config.update({
    region: 'us-east-2'
})

const ddb = new AWS.DynamoDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/send-data', (req, res) => {

    const uid = uuidv4();

    const params = {
        TableName: 'temp',
        Item: {
            id: {S: uid},
            name: {S: req.body.name},
            age: {N: req.body.age.toString()}
        }
    };

    ddb.putItem(params, (err, data) => {
        if (err) {
            console.error('Error: ', err);
            res.status(500).json({error: 'Failed to send data to DynamoDB'});
        } else {
            console.log('Data sent successfully: ', data);
            res.status(200).json({message: 'Data sent to DynamoDB successfully'});
        }
    })
})

module.exports = app;