const { errorHandler } = require("../Generals/errorHandler");
const StatisticsManager = require("../../services/Statistics/statisticsManager");

async function mostBookedPlace(req, res) {
  try {
    const { officeId } = req.params;
    const returnedStatistics = await StatisticsManager.mostBookedPlace(
      officeId
    );
    res.status(200).send(JSON.stringify(returnedStatistics));
    res.end();
  } catch (error) {
    errorHandler(error, res);
  }
}

async function mostBookedOfficeId(req, res){
    try {
        const returnedStatistics = await StatisticsManager.mostBookedOffice();
        res.status(200).send(JSON.stringify(returnedStatistics));
        res.end();
      } catch (error) {
        errorHandler(error, res);
      }
}

async function compareTwoDatesOfOffice(req, res){
    try {
        const { officeId, date1, date2 } = req.params;
        const newDate1 = new Date(date1);
        const newDate2 = new Date(date2);
        const returnedStatistics = await StatisticsManager.compareTwoDates(officeId, newDate1, newDate2);
        res.status(200).send(JSON.stringify(returnedStatistics));
        res.end();
      } catch (error) {
        errorHandler(error, res);
      }
}

module.exports = {
    mostBookedPlace,
    mostBookedOfficeId,
    compareTwoDatesOfOffice
};
