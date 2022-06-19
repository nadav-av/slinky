import React, { useState, useEffect } from "react";
import AlertsList from "../../Components/Alerts/AlertsList";
import { nanoid } from "nanoid";
import Searchbar from "../../Components/Generics/Searchbar";

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: nanoid(),
      text: "this is a FIRST test alert",
      date: "2020-01-01",
    },
    {
      id: nanoid(),
      text: "this is a SECOND test alert",
      date: "2020-01-01",
    },
    {
      id: nanoid(),
      text: "this is a THIRD test alert",
      date: "2020-01-01",
    },
    {
      id: nanoid(),
      text: "this is a FORTH test alert",
      date: "2022-01-01",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("alerts"));
    if (savedNotes) {
      setAlerts(savedNotes);
    }
  }, []); //when dependency array is empty only run on the beggining

  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = (text) => {
    console.log(text);
    setAlerts([
      ...alerts,
      { id: nanoid(), text, date: new Date().toLocaleDateString() },
    ]);
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div>
      <Searchbar handleSearch={setSearchText} />
      <AlertsList
        alerts={alerts.filter((alert) =>
          alert.text.toLowerCase().includes(searchText.toLowerCase())
        )}
        handleAddAlert={addAlert}
        handleDeleteAlert={deleteAlert}
      ></AlertsList>
    </div>
  );
};

export default Alerts;
