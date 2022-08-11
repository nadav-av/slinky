import React from "react";
import "./visualMap.css";
import VisualMapForm from "../../Components/mapForm/MapForm";

const VisualMap = () => {
  return (
    <div className="map-container">
      <div className="map-glass">
        <VisualMapForm />
      </div>
    </div>
  );
};

export default VisualMap;
