import React, { useState } from "react";
import "./foodOrderForm.css";
import foodOrderClient from "../../Services/foodOrderClient";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { SERVER_ERROR, INVALID_TOKEN } from "../../Services/Consts";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useSelector } from "react-redux";

const FoodOrderForm = ({
  resturant,
  namesAndOrders,
  setNamesAndOrders,
  setIsModalShown,
  logo,
}) => {
  const myUser = useSelector((state) => state.allReducers.user.user);

  let navigate = useNavigate();
  const [foodOrder, setFoodOrder] = useState();
  const [orderOffice, setOrderOffice] = useState();

  const handleOfficeChange = (e) => {
    setOrderOffice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFoodOrder = {
      firstName: myUser.firstName,
      lastName: myUser.lastName,
      office: orderOffice,
      order: foodOrder,
      resturant: resturant,
    };
    const res = await foodOrderClient.addOrder(newFoodOrder);
    if (res === INVALID_TOKEN) {
      navigate("/login");
    }
    if (res === SERVER_ERROR) {
      alert("Server Error");
    } else {
      setNamesAndOrders([...namesAndOrders, newFoodOrder]);
      setIsModalShown(false);
      setTimeout(() => {
        confetti();
      }, 200);
    }
  };

  return (
    <div className="center food-order-center">
      <form className="food-order-form" onSubmit={handleSubmit}>
        <div className="food-order-form-logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="food-order-header">What do you want to eat</h1>
        <textarea
          className="food-order-text-area"
          type="text"
          onChange={(e) => setFoodOrder(e.target.value)}
          required
        />
        <FormControl className="food-order-form-control">
          <InputLabel id="demo-simple-select-label">Office</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderOffice}
            label="Age"
            onChange={handleOfficeChange}
          >
            <MenuItem value={"Rubinshtein Twin Towers"}>
              Rubinshtein Twin Towers
            </MenuItem>
            <MenuItem value={"Azrieli Square Tower"}>
              Azrieli Square Tower
            </MenuItem>
          </Select>
        </FormControl>
        <span></span>
        <input className="food-order-submit" type="submit" />
      </form>
    </div>
  );
};

export default FoodOrderForm;
