const { UserModel, validate } = require("../models/users");


async function registeredAuth(req, res, next) {
  const user = await UserModel.findOne({_id: req.user._id});
  
  if(user.reg_offices.includes(req.params.officeID))
  {
      next();
  }
  else
  {
      return res.status(403).json({
          message: "Access denied. You are not a registered user in this office.",
      });
  }
}

module.exports = registeredAuth;
