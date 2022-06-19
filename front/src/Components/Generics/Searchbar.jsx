import React from "react";
import { MdSearch } from "react-icons/md";
import "./Searchbar.css";

const Searchbar = ({ handleSearch }) => {
  return (
    <div className="searchbar">
      <MdSearch className="search-icon" size="1.3em" />
      <input
        type="text"
        placeholder="Type to search"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
