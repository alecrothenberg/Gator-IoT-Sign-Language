import { getDatabase, onValue, ref } from "firebase/database";
import React, { useState } from "react";
import { firebaseApp } from "../firebase";

const db = getDatabase(firebaseApp);

const DisplayText = () => {
  const containerStyle = {
    textAlign: 'center',
    maxWidth: '80%',
    margin: 'auto',
    marginTop: '50px',
  };

  const textAreaStyle = {
    width: '100%',
    minHeight: '100px',
    fontSize: '18px',
    margin: '20px 0',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  };

  const [fullWord, setFullWord] = useState("");

  const fetchData = async () => {
    try {
      const dataRef = ref(db, 'Translation/translated_val');

      onValue(
        dataRef,
        (snapshot) => {
          const data = snapshot.val();

          if (data !== null) {
            if (data === "SPACE") {
              setFullWord("");
            } else {
              setFullWord((prevWord) => prevWord + data);
            }
          } else {
            console.log("null val from snapshot");
            throw new Error("null snapshot");
          }
        },
        {
          onlyOnce: true,
        }
      );
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const buttonText = fullWord === "" ? "Start Signing!" : "Get Next Letter!";
  
  return (
    <div style={containerStyle}>
      <textarea
        style={textAreaStyle}
        placeholder="Your text will appear here"
        value={fullWord}
        readOnly
      />
      <br />
      <button style={buttonStyle} onClick={fetchData}>
        {buttonText}
      </button>
    </div>
  );
};

export default DisplayText;