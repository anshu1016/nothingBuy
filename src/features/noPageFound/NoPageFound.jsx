import React from "react";
import "./noPageFound.css";
import notFound from "../../assets/notFound.png";
import { NavLink } from "react-router-dom";
const NoPageFound = () => {
  return (
    <div>
      <img src={notFound} alt="errorPage" height={250} width={250} />
      <p className="" center>
        click Here to go <NavLink to="/productlisting">Home</NavLink>
      </p>
    </div>
  );
};

export default NoPageFound;
