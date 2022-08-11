import { officePositions } from "./Consts";

class statisticsClient {
    constructor() {
      this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042";
    }
    async getChairsStatistics(officeId){
      const userJWTToken = localStorage.getItem("x-auth-token");
        const dataSetLabel = "Chairs"
        const response = await fetch(`${this.url}/statistics/${officeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userJWTToken,
          },
        })
        const responseAsJson = await response.json();
        return this._getInformation(responseAsJson, dataSetLabel, officeId);
    }
    async getOfficesStatistics(){
      const userJWTToken = localStorage.getItem("x-auth-token");
        const dataSetLabel = "Offices"
        const response = await fetch(`${this.url}/statistics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userJWTToken,
          },
        })
        const responseAsJson = await response.json();
        const data = {
            labels: Object.keys(officePositions).map((key) => key),
    datasets: [
      {
        label: dataSetLabel,
        data: responseAsJson.map((data) => data.booked),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
}
return data;
    }
    async compareTwoDatesOfOffice(officeId, date1, date2){
      const userJWTToken = localStorage.getItem("x-auth-token");
        const response = await fetch(`${this.url}/statistics/compare-days/${officeId}/${date1}/${date2}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userJWTToken,
          },
        })
        const responseAsJson = await response.json();
        const dataForDataset1 = this._createDataForDatasetsOfChairs(responseAsJson.firstDate, officeId);
        const dataForDataset2 = this._createDataForDatasetsOfChairs(responseAsJson.secondDate, officeId);
            const data = {
                labels: officePositions[officeId],
        datasets: [
          {
            label: date1,
            data: Object.keys(dataForDataset1).map((key) => dataForDataset1[key]),
            fill: true,
            backgroundColor: "rgba(75,20,20,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
          {
            label: date2,
            data: Object.keys(dataForDataset2).map((key) => dataForDataset2[key]),
            fill: true,
            backgroundColor: "#742774",
          },
        ],
    }
    return data;
            }
    _createDataForDatasetsOfChairs(dataArr, officeId){
        const objectToReturn = [];
        if(dataArr === undefined || dataArr.length === 0){
          return objectToReturn;
        }
        Object.keys(officePositions[officeId]).forEach(function(key){
            const keyPosition = officePositions[officeId][key];
            objectToReturn[keyPosition] = 0;
        })
        dataArr.filter((element) => {
            objectToReturn[element.bookingPlace] = element.booked;
        })
        return objectToReturn;
    }
    async _getInformation(responseAsJson, dataSetLabel, officeId){
        if(Array.isArray(responseAsJson)){
            const datasetsAfter = this._createDataForDatasetsOfChairs(responseAsJson, officeId);
        const data = {
            labels: officePositions[officeId],
    datasets: [
      {
        label: dataSetLabel,
        data: Object.keys(datasetsAfter).map((key) => datasetsAfter[key]),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
}
return data;
        } else{
            return [];
        }
    }
  }
  
  export default new statisticsClient();
  