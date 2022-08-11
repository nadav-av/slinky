import "./statistics.css";
import React, { useMemo, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import BarChart from "./Charts/barChart";
import statisticsClient from "../../Services/statisticsClient";
import LineChart from "./Charts/lineChart";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Statistics = () => {
  const [userData, setUserData] = useState([]);
  const [whichChart, setWhichChart] = useState();
  const [whichInfo, setWhichInfo] = useState();
  const [isShowOfficeIdRadioList, setIsShowOfficeIdRadioList] = useState(false);
  const [firstDateOfCompareDates, setFirstDateOfCompareDates] = useState(null);
  const [secondDateOfCompareDates, setSecondDateOfCompareDates] =
    useState(null);
  const [officeId, setOfficeId] = useState(null);
  const [showDates, setShowDates] = useState(false);

  const handleChangeStatisticsChoose = async (event) => {
    switch (event.target.value) {
      case "Chairs information":
        setStats(null, null, null, true, "");
        setUserData([]);
        setWhichInfo("Chairs information");
        break;
      case "Offices information":
        setStats("BarChart", null, null, false, "");
        setUserData(await statisticsClient.getOfficesStatistics());
        break;
      case "Compare dates":
        setStats(null, null, null, true, "");
        setWhichInfo("Compare dates");
        setUserData([]);
        break;
      default:
        break;
    }
  };

  const setStats = (Chart, FirstDate, SecondDate, OfficeIdBool, id) => {
    setWhichChart(Chart);
    setFirstDateOfCompareDates(FirstDate);
    setSecondDateOfCompareDates(SecondDate);
    setIsShowOfficeIdRadioList(OfficeIdBool);
    setOfficeId(id);
    setShowDates(false);
  }

  const handleChangeOfficeId = async (event) => {
    setOfficeId(event.target.value);
    if (whichInfo === "Chairs information") {
      setUserData(
        await statisticsClient.getChairsStatistics(event.target.value)
      );
    } else {
      if (
        firstDateOfCompareDates !== null &&
        secondDateOfCompareDates !== null
      ) {
        setUserData(
          await statisticsClient.compareTwoDatesOfOffice(
            event.target.value,
            firstDateOfCompareDates,
            secondDateOfCompareDates
          )
        );
      }
      setShowDates(true);
    }
    setWhichChart("LineChart");
  };

  const chooseWhichChart = useMemo(() => {
    if (userData.length !== 0) {
      switch (whichChart) {
        case "BarChart":
          return (
            <div className="chart-container-try">
              <BarChart chartData={userData} />
            </div>
          );
        case "LineChart":
          return (
            <div className="chart-container-try">
              <LineChart chartData={userData} />
            </div>
          );
        default:
          return null;
      }
    } else {
      return (
        <>
          <div className="empty-data-container">
            <i className="fa-solid fa-chart-column empty-data-icon"></i>
          </div>
          <h4>
            In order to see anlayzed data, please choose the information you
            want to see, in the menu above.
          </h4>
        </>
      );
    }
  }, [userData]);
  return (
    <div className="chart-container">
      <div className="form-control">
        <div className="statstic-form-options">
          <div className="statistic-statistic-body">
            <div className="formcontrol-style">
              <FormControl fullWidth spacing={2}>
                <InputLabel id="Statistics-select-label" margin="dense">
                  Statistics
                </InputLabel>
                <Select
                  labelId="Statistics-select-label"
                  id="Statistics-select"
                  defaultValue={""}
                  label="Statistics"
                  onChange={handleChangeStatisticsChoose}
                >
                  <MenuItem value={"Chairs information"}>
                    Chairs information
                  </MenuItem>
                  <MenuItem value={"Offices information"}>
                    Offices information
                  </MenuItem>
                  <MenuItem value={"Compare dates"}>Compare dates</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {isShowOfficeIdRadioList === true ? (
            <div className="statistic-officesanddates-body">
              <div className="formcontrol-style">
                <FormControl fullWidth spacing={2}>
                  <InputLabel id="Office-id-select-label">Offices</InputLabel>
                  <Select
                    labelId="office-id-select"
                    id="office-id-select"
                    value={officeId}
                    label="Office"
                    onChange={handleChangeOfficeId}
                  >
                    <MenuItem value={"1"}>Rubinshtein Twin Towers</MenuItem>
                    <MenuItem value={"2"}>Azrieli Square Tower</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {showDates === true ? (
                <div className="statistic-dates-body">
                  <form>
                    <div className="statitcs-form-date">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          class="ui-datepicker"
                          label="Date"
                          inputFormat="dd/MM/yyyy"
                          value={firstDateOfCompareDates}
                          onChange={async (date) => {
                            setFirstDateOfCompareDates(new Date(date));
                            if (secondDateOfCompareDates !== null) {
                              setUserData(
                                await statisticsClient.compareTwoDatesOfOffice(
                                  officeId,
                                  new Date(date),
                                  secondDateOfCompareDates
                                )
                              );
                            }
                          }}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="statitcs-form-date">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          class="ui-datepicker"
                          label="Date"
                          inputFormat="dd/MM/yyyy"
                          value={secondDateOfCompareDates}
                          onChange={async (date) => {
                            setSecondDateOfCompareDates(new Date(date));
                            if (firstDateOfCompareDates !== null) {
                              setUserData(
                                await statisticsClient.compareTwoDatesOfOffice(
                                  officeId,
                                  firstDateOfCompareDates,
                                  new Date(date)
                                )
                              );
                            }
                          }}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </form>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="statistics-data">
          <div className="chart-container-try">{chooseWhichChart}</div>
        </div>
      </div>
    </div>
  );
};
export default Statistics;
