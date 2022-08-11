import React from "react";
import bell from "./bell.png";
import connection from "./connection.png";
import weekly from "./weekly.png";

const FeaturedCard = () => {
  const featuredData = [
    {
      cover: bell,
      name: "Alert",
      total: "Notify other people",
    },
    {
      cover: weekly,
      name: "Schedule",
      total: "Book your workspace",
    },
    {
      cover: connection,
      name: "Connect",
      total: "Connect with other people",
    },
  ];

  return (
    <>
      {featuredData.map((items, index) => (
        <div className="box" key={index}>
          <img src={items.cover} alt="" />
          <h4>{items.name}</h4>
          <label>{items.total}</label>
        </div>
      ))}
    </>
  );
};

export default FeaturedCard;
