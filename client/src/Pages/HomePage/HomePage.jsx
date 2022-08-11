import React from "react";
import "./homePage.css";
import Hero from "./hero/Hero";
import Featured from "./featured/Featured";
import Offices from "./offices/Offices";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <Hero />
      <Featured />
      <Offices />
    </div>
  );
};

export default HomePage;
