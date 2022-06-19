import React from "react";
import "../../pages/LoginPage/LoginPage.scss";

const LogRegSlider = ({ text, handleClick, sliderRef }) => {
  return (
    <div className="log-reg-side" onClick={handleClick} ref={sliderRef}>
        <div className="inner-container">
          <div className="text">{text}</div>
        </div>
    </div>
  );
};

export default LogRegSlider;
