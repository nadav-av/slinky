function admin(req, res, next) {
  if (req.tokenData.isAdmin) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

module.exports = admin;