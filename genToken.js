const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (data) {
  return jwt.sign(data, config.get("jwtPrivatekey"));
};
