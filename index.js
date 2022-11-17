const express = require("express");
const app = express();
const ejs = require("ejs");
const fetch = require("node-fetch");
const fs = require("fs");
const temputer = require("./js/temputer");
require("dotenv").config();

// middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

//homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});
//api key
const myKey = "c6838cc306630664ea3e7e947a7ea9bc";

//pull data from weather api and show data on weather.ejs
app.get("/response", async (req, res) => {
  try {
    let { city } = req.query;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
    let d = await fetch(url);
    let djs = await d.json();

    //use function to convert tempture to celsius
    let kTemp = djs.main.temp;
    let cTemp = temputer.kToC(kTemp);
    console.log(djs);
    res.render("weather.ejs", { djs, cTemp });

    // Write data in 'weatherData.txt'
    let data = JSON.stringify(djs);
    fs.writeFile("./config/weatherData.txt", data, (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });

    //if any error,show error information
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
