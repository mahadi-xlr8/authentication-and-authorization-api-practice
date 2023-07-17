const user = require("./routes/user");
const auth = require("./routes/auth");
const movie = require("./routes/movie");

const express = require("express");
const app = express();
const config = require("config");
if (!config.get("jwtPrivatekey")) {
  console.error("FATAL ERROR: jwt private key is not set!");
  process.exit(1);
}

app.use(express.json());
app.use("/api/register", user);
app.use("/api/login", auth);
app.use("/api/movie", movie);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => console.log("listening on port 3000..."));
