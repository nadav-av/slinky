import { useState, useEffect } from "react";
import cn from "classnames";
import "./foodFlipCard.scss";
import FoodOrderList from "./../FoodOrderList/FoodOrderList";
import GenericModal from "../GenericModal/genericModal";
import FoodOrderForm from "./../FoodOrderForm/FoodOrderForm";
import foodOrderClient from "../../Services/foodOrderClient";
import { CSVLink } from "react-csv";

function FoodFlipCard({ card }) {
  const [showBack, setShowBack] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [namesAndOrders, setNamesAndOrders] = useState([]);
  const [names, setNames] = useState([]);

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Order", key: "order" },
    { label: "Office", key: "office" },
  ];

  const csvReport = {
    data: namesAndOrders,
    headers: headers,
    filename: `orders_${card.resturant}.csv`,
  };

  function handleClick() {
    if (card.variant === "click") {
      setShowBack(!showBack);
    }
  }

  function handleFocus() {
    if (card.variant === "focus") {
      setShowBack(true);
    }
  }

  function handleBlur() {
    if (card.variant === "focus") {
      setShowBack(false);
    }
  }

  useEffect(() => {
    foodOrderClient.getOrders(card.resturant).then((orders) => {
      setNamesAndOrders(orders);
      setNames(orders.map((order) => `${order.firstName} ${order.lastName}`));
    });
  }, []);

  useEffect(() => {
    setNames(
      namesAndOrders.map((order) => {
        return `${order.firstName} ${order.lastName}`;
      })
    );
  }, [namesAndOrders]);

  return (
    <div>
      {isModalShown === true ? (
        <GenericModal
          open={isModalShown}
          onClose={() => {
            setIsModalShown(false);
          }}
          content={
            <FoodOrderForm
              resturant={card.resturant}
              namesAndOrders={namesAndOrders}
              setNamesAndOrders={setNamesAndOrders}
              setIsModalShown={setIsModalShown}
              logo={card.img}
            />
          }
        />
      ) : (
        <div
          tabIndex={card.id}
          className={cn("flip-card-outer", {
            "focus-trigger": card.variant === "focus",
          })}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div
            className={cn("flip-card-inner", {
              showBack,
              "hover-trigger": card.variant === "hover",
            })}
          >
            <div className="card front">
              <div className="card-body d-flex justify-content-center align-items-center">
                <img src={card.img} alt="" />
              </div>
            </div>
            <div className="card back">
              <div className="card-body d-flex justify-content-center align-items-center">
                <div className="foodList"></div>
                <FoodOrderList names={names}></FoodOrderList>
                <button
                  className="add-order-btn"
                  onClick={() => setIsModalShown(true)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="food-form-csvLink-container">
            <div className="food-form-csvLink">
              <CSVLink className="csv-link" {...csvReport}>
                Export order to CSV
              </CSVLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodFlipCard;
