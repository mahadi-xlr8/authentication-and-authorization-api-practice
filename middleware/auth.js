const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).send("no token provided!");
  }
  try {
    const decode = jwt.verify(token, config.get("jwtPrivatekey"));
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).send("Invalid token!");
  }
};
