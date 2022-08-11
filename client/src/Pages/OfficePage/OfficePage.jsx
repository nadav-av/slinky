import React from "react";
import "./officePage.css";
import OfficeForm from "../../Components/OfficeForm/OfficeForm";

const OfficePage = () => {
  return (
    <div className="office-container">
      <div className="office-glass">
        <OfficeForm />
      </div>
    </div>
  );
};

export default OfficePage;
