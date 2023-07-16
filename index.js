const user = require("./routes/user");
const auth = require("./routes/auth");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/register", user);
app.use("/api/login", auth);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => console.log("listening on port 3000..."));
