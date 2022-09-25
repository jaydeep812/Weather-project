const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var query = req.body.cityName;
  const apiKey = "8b2f2317a4fc810af68f8e09f6cae30b";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      console.log(weatherData);
      const temp = weatherData.main.temp
      console.log(temp);
      const descp = weatherData.weather[0].description;
      console.log(descp);
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + descp + "<p>")
      res.write("<h1>The temp in " + query + " is " + temp + " degree Celsius</h1>");
      res.write("<img src=" + iconUrl + ">")
      res.send()
    })
  })

  console.log("post received");
})




app.listen(3000, function () {
  console.log("Server is running on port 3000");
})
