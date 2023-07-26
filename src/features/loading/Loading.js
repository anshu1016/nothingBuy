import React from "react";
import "./loading.css";
import loading from "../../assets/loading.png";
const Loading = () => {
  return (
    <div className="loadingDiv">
      <img src={loading} alt="loading" className="loading" />
    </div>
  );
};

export default Loading;
