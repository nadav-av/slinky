import React from "react";
import { Routes, Route } from "react-router-dom";

import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import Alerts from "./pages/Alerts/Alerts";
import Messages from "./pages/Messages/Messages";
import Gantt from "./pages/Gantt/Gantt";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <React.Fragment>
      <div className="nav-bar">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about" element={<About />} exact />
            <Route path="/login" element={<LoginPage />} exact />
            <Route path="/alerts" element={<Alerts />} exact />
            <Route path="/messages" element={<Messages />} exact />
            <Route path="/gantt" element={<Gantt />} exact />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
