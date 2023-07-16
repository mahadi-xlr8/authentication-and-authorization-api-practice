const joi = require("joi");
const joiPassword = require("joi-password-complexity");

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().min(5).max(200).required().email(),
    password: joi.string().min(5).max(50).required(),
  });
  return schema.validate(user);
}
function validatePassword(pass) {
  return joiPassword(
    {
      min: 8,
      max: 20,
      numeric: 1,
      lowerCase: 1,
      upperCase: 1,
    },
    "password"
  ).validate(pass);
}
function validateAuth(data) {
  const schema = joi.object({
    email: joi.string().min(5).max(200).required().email(),
    password: joi.string().min(5).max(50).required(),
  });
  return schema.validate(data);
}

module.exports.validateAuth = validateAuth;
module.exports.validatePassword = validatePassword;
module.exports.validateUser = validateUser;
