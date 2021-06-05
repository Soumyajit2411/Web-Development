const express = require("express");
const https = require("https");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityname;
  const apikey = "28eb53f4d0b1d1921f39a766c72d0be9";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    units +
    "";
  https.get(url, (response) => {
    console.log("statusCode:", response.statusCode);
    console.log("headers:", response.headers);
    response.on("data", (d) => {
      const weather = JSON.parse(d);
      const temp = weather.main.temp;
      const des = weather.weather[0].description;
      const icon = weather.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The description</h1>" + des);
      res.write("<h1>The tempature in " + query + "</h1>" + temp);
      res.write("<img src=" + image + ">");
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
