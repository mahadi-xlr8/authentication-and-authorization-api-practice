const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to the database!"))
  .catch((err) => console.log(err.message));

const users = mongoose.model(
  "users",
  new mongoose.Schema({
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
  })
);
async function addUser(name, email, password) {
  try {
    const user = new users({
      name,
      email,
      password,
    });
    await user.save();
    return "new user added to the database!";
  } catch (err) {
    return "email already has an account!";
  }
}


module.exports.user = users;

