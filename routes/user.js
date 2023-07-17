const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const { user } = require("../server");
const { validatePassword, validateUser } = require("../validation");

router.post("/", async (req, res) => {
  const validation = validateUser(
    _.pick(req.body, ["name", "email", "password"])
  );
  const passValidate = validatePassword(req.body.password);
  if (validation.error || passValidate.error) {
    if (validation.error)
      res.status(400).send(validation.error.details[0].message);
    else res.status(400).send(passValidate.error.details[0].message);
  } else {
    try {
      const newUser = new user(_.pick(req.body, ["name", "email", "password"]));

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(newUser.password, salt);
      newUser.password = hashed;
      await newUser.save();
      const token = newUser.genAuthToken();

      res
        .header("x-token", token)
        .status(200)
        .send("new user is added to the database!");
    } catch (err) {
      res.status(400).send("email already have an account!");
    }
  }
});

module.exports = router;
