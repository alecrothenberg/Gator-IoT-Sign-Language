import React from "react";

const NavBar = () => {
  const navbarStyle = {
    backgroundColor: '#FFA500', 
    color: '#0000FF', 
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
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
