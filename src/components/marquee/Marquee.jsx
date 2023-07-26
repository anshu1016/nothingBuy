import React from "react";
import "./marquee.css";
import { NavLink } from "react-router-dom";

const Marquee = () => {
  return (
    <div className="marqueeContainer">
      <div className="marquee marquee1">
        <div className="content">
          <p>Summer is Coming!!</p>
          <h2>Get ready for summer with the latest smartphones!</h2>
         <NavLink to="/productlisting"> <button>Explore Now</button></NavLink>
        </div>
        <div className="image">
            <img src="../../assets/Phone-2-PDP-OS-Header-Desktop.webp" alt="" />
        </div>
      </div>
     
    </div>
  );
};

export default Marquee;
