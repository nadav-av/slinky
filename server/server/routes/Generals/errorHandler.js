function errorHandler(error, res){
    try{
      res.status(error.statusCode).send(JSON.stringify(error.message));
    } catch(error){
      res.status(500).send(JSON.stringify("Something went wrong"));
    }
  }

  module.exports = {
    errorHandler
  }