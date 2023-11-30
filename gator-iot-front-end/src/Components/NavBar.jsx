import React from "react";

const NavBar = () => {
  const navbarStyle = {
    color: '#0000FF', 
    height: '80px',
    padding: '0 20px',
    textAlign: 'center', 
  };

  return (
    <div style={navbarStyle}>
      <h1>
        Gator IoT Sign Language Interpretation
      </h1>
    </div>
  );
}

export default NavBar;
