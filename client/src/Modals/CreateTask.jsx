import React, { useState } from "react";
import "./createTask.css";
import notificationClient from "../Services/notificationClient";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const CreateTask = ({ onSubmit, reRender }) => {
  const [content, setContent] = useState("");
  const [officeId, setOfficeId] = useState(1);
  const [category, setCategory] = useState("idea");

  const handleOfficeChange = (e) => {
    setOfficeId(e.target.value);
  };

  let categories = [
    { value: "problem", label: "Problem" },
    { value: "idea", label: "Idea" },
    { value: "giveaway", label: "Giveaway" },
    { value: "announcment", label: "Announcment" },
    { value: "emergancy", label: "Emergancy" },
  ];

  const addNotification = async (e) => {
    try {
      onSubmit();
      await notificationClient.addNotification(officeId, content, category);
      await reRender();
    } catch {
      console.err("err");
      alert("Notification Failed.");
    }
  };
  return (
    <div className="center add-notification-center">
      <form className="add-notification-form" onSubmit={addNotification}>
        <h1 className="add-notification-header">Add your notification</h1>

        <FormControl margin="normal" className="add-notification-form-control">
          <InputLabel id="demo-simple-select-label">Office</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={officeId}
            label="Office"
            onChange={handleOfficeChange}
          >
            <MenuItem key={"Rubinshtein"} value={1}>
              Rubinshtein Twin Towers
            </MenuItem>
            <MenuItem key={"Azrieli"} value={2}>
              Azrieli Square Tower
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl margin="normal" className="add-notification-form-control">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.label} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <textarea
          className="add-notification-text-area"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <span></span>
        <input className="add-notification-submit" type="submit" />
      </form>
    </div>
  );
};

export default CreateTask;
