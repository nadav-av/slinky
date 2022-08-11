import "./foodOrderList.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const FoodOrderList = ({ names }) => {
  return (
    <div className="food-order-list-container">
      <List>
        {names.map((name, index) => (
          <ListItem key={index}>{name}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default FoodOrderList;
