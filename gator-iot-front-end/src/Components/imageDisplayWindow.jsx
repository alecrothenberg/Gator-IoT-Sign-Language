import React from "react";

const ImageDisplayWindow = ({signedTextInput}) => {
  const containerStyle = {
    textAlign: 'center',
    maxWidth: '100%',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
  };

  return (
    <div style={containerStyle}>
      <img
        src="https://via.placeholder.com/400x300"
        alt="Placeholder"
        style={imageStyle}
        
      />
      <p style={{margin: '100px'}}>Most Recent Image </p>
      <p style={{ marginTop: '10px' }}>{signedTextInput}</p>
    </div>
   
  );
};

export default ImageDisplayWindow;
