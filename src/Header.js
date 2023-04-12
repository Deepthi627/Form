import React from "react";
import "./App.css";

const Header = () => {
  return (
    <div
      className="ui fixed menu"
      style={{ backgroundColor: "blue" , height:"50px"}}
    >
      <div className="ui container center" >
        <h2 style={{ color: "white", marginLeft: "45%"}}>Contacts</h2>
      </div>
    </div>
  );
};

export default Header;
