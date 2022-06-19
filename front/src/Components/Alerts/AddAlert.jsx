import React, { useState } from "react";

const AddAlert = ({ handleAddAlert }) => {
  const [alertText, setAlertText] = useState("");
  const charLimit = 200;

  const handleChange = (e) => {
    if (charLimit - e.target.value.length >= 0) {
      setAlertText(e.target.value);
    }
  };

  const handleSaveAlert = () => {
    if (alertText.trim().length > 0) {
      handleAddAlert(alertText);
    }
    setAlertText("");
  };

  return (
    <div className="alert new-alert">
      <textarea
        rows="4"
        cols="6"
        placeholder="Type to add an alert"
        onChange={handleChange}
        value={alertText}
      ></textarea>
      <div className="alert-footer">
        <small>{charLimit - alertText.length} Remaining</small>
        <button className="saveBtn" onClick={handleSaveAlert}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AddAlert;
