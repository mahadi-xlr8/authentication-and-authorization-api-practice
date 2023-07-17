const express = require("express");
const router = express.Router();
const { movies, user } = require("../server");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const result = user.findById(req.user.id);
  if (!result) return res.status(400).send("invalid token!");
  if (!req.body.name) return res.status(400).send("name is required!");
  const movie = new movies({
    name: req.body.name,
    user: req.user.id,
  });
  try {
    await movie.save();
    res.status(200).send("movie added to the database!");
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
