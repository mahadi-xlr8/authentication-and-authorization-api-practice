const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to the database!"))
  .catch((err) => console.log(err.message));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 250 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
});
userSchema.methods.genAuthToken = function () {
  return jwt.sign({ id: this._id }, config.get("jwtPrivatekey"));
};

const users = mongoose.model("users", userSchema);

module.exports.user = users;
