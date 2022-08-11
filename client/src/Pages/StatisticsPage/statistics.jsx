import React from "react";
import "./statistics.css";
import Statistics from "../../Components/Statistics/statistics";

const StatisticsPage = () => {
  return (
    <div className="statistics-container">
      <div className="statistics-glass">
        <Statistics />
      </div>
    </div>
  );
};

export default StatisticsPage;
