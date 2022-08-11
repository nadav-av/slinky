import React from "react";
import "./Featured.css";
import FeaturedCard from "./FeaturedCard";

const Featured = () => {
  return (
    <>
      <section className="services">
        <div className="services-container">
          <h1>Our services</h1>
          <div className="services-cards">
            <FeaturedCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Featured;
