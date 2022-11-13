const express = require("express");
const app = express();
const ejs = require("ejs");
const fetch = require("node-fetch");

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//  k to cel
function kToC(k) {
  return (k - 273.15).toFixed(2);
}

//api key
let myKey = "c6838cc306630664ea3e7e947a7ea9bc";

app.get("/response", async (req, res) => {
  let { city } = req.query;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
  let response = await fetch(url);
  let data = await response.json;
  let { temp } = data.main;
  let cTemp = ktoc(temp);
  console.log(data);
  res.render("weather.ejs", { data, cTemp });
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
