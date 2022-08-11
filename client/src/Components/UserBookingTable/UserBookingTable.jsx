import React, { useState, useEffect } from "react";
import "./userBookingTable.css";
import userClient from "../../Services/userClient";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { Loader } from "monday-ui-react-core";
import noBooksPhoto from "../../images/no-result-search-icon.jpg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserBookingTable = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [userFutureBookings, setUserFutureBookings] = useState([]);
  const [userPastBookings, setUserPastBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState(0);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  useEffect(() => {
    userClient
      .getUserBookings()
      .then((res) => {
        setUserBookings(res);
        const FutureBookings = [];
        const PastBookings = [];
        res.forEach((element) => {
          if (new Date(element.startDate) > Date.now()) {
            FutureBookings.push(element);
          } else {
            PastBookings.push(element);
          }
        });
        setUserFutureBookings(FutureBookings);
        setUserPastBookings(PastBookings);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch(setIsLoading(true));
  }, []);

  const pastColumns = [
    { label: "Start Date", accessor: "start_date" },
    { label: "Start Hour", accessor: "start_hour" },
    { label: "End Hour", accessor: "end_hour" },
    { label: "Reseved Place", accessor: "reserved_place" },
    { label: "Office", accessor: "office" },
  ];
  const deleteCol = { label: "Delete", accessor: "delete" };
  const futureColumns = [...pastColumns, deleteCol];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showNoBookings = (tab) => {
    return (
      <>
        <div className="empty-table-container">
          <i className="fa-solid fa-hourglass empty-table-icon"></i>
        </div>
        {tab === "past" ? (
          <h3>You don`t have any upcoming bookings</h3>
        ) : (
          <h3>You don`t have any old bookings</h3>
        )}
      </>
    );
  };

  if (isLoading) {
    return <Loader size={40} />;
  } else {
    return (
      <div className="user-booking-table">
        <>
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <Tabs
              id="option-tabs"
              value={value}
              onChange={handleChange}
              centered
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#A77BCA",
                },
              }}
            >
              <Tab
                label="Future Orders"
                style={{ color: "#A77BCA", width: "200px" }}
              />
              <Tab
                label="Past Orders"
                style={{ color: "#A77BCA", width: "200px" }}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {userFutureBookings.length > 0 ? (
              <div className="booking-table">
                <table className="content-table">
                  <TableHead columns={futureColumns} />
                  <TableBody
                    columns={futureColumns}
                    tableData={userFutureBookings}
                    userBookings={userFutureBookings}
                    setUserBookings={setUserFutureBookings}
                  />
                </table>
              </div>
            ) : (
              showNoBookings("past")
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {userPastBookings.length > 0 ? (
              <div className="booking-table">
                <table className="content-table">
                  <TableHead columns={pastColumns} />
                  <TableBody
                    columns={pastColumns}
                    tableData={userPastBookings}
                    userBookings={userPastBookings}
                    setUserBookings={setUserPastBookings}
                  />
                </table>
              </div>
            ) : (
              showNoBookings("future")
            )}
          </TabPanel>
        </>
      </div>
    );
  }
};

export default UserBookingTable;
