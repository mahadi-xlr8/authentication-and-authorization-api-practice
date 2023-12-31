const { user } = require("../server");
const { validateAuth } = require("../validation");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const validation = validateAuth({
    email: req.body.email,
    password: req.body.password,
  });
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const result = await user.findOne({ email: req.body.email });
  if (!result) {
    return res.status(400).send("Invalid Email or Password!");
  }

  const match = await bcrypt.compare(req.body.password, result.password);

  if (match) {
    res.status(200).send(result.genAuthToken());
  } else res.status(400).send("Invalid Email or Password!");
});

module.exports = router;
