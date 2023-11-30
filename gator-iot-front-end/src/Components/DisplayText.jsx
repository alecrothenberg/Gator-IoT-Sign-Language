import { onValue, ref } from "firebase/database";
import React, { useState } from "react";
import { db } from "../firebase";

const DisplayText = ({ signedTextInput }) => {
  const containerStyle = {
    textAlign: 'center',
    maxWidth: '100%',
  };

  // Use state instead of useRef to handle re-renders
  const [fullWord, setFullWord] = useState("");
  
  const fetchData = async () => {
    try {
      // Reference to the data in the database (adjust the path as needed)
      const dataRef = ref(db, 'Translation/translated_val');

      onValue(
        dataRef,
        (snapshot) => {
          const data = snapshot.val();

          if (data !== null) {
            if (data === "SPACE") {
              // Use setFullWord to update state
              setFullWord("");
            } else {
              // Use setFullWord to update state
              setFullWord((prevWord) => prevWord + data);
            }
          } else {
            console.log("null val from snapshot");
          }
        },
        {
          onlyOnce: true, // Optional: Remove this if you want continuous updates
        }
      );
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <p style={{ margin: '100px' }}>Most Recent Image </p>
      <p style={{ marginTop: '10px' }}>{signedTextInput}</p>
      <p> should be {fullWord} </p>

      {/* Button to trigger the query */}
      <button onClick={fetchData}>Run Query</button>
    </div>
  );
};

export default DisplayText;
