import React from "react";
import SignOut from "./SignOut";

const NavBar = () => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#0000FF', 
    height: '80px',
    padding: '0 20px',
    textAlign: 'center', 
  };

  const titleContainerStyle = {
    flex: '1', // This will allow the title to take available space and stay centered
    textAlign: 'center',
  };

  return (
    <div style={navbarStyle}>
      <div style={titleContainerStyle}>
        <h1>
          Gator IoT Sign Language Interpretation
        </h1>
      </div>
      <SignOut />
    </div>
  );
}

export default NavBar;
