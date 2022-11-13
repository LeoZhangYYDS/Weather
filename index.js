const express = require("express");
const ejs = require("ejs");
const app = express();

// middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
