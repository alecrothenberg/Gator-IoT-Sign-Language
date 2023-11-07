// Creating a server using the http library
const http = require('http');

const app = require('./app');

// Default port is localhost:3000 unless otherwise specified
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('listening on port 3000');
})