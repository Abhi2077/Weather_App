const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
console.log(req.body.cityName);

const query = req.body.cityName;
const apikey = process.env.API_KEY;
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apikey +"&units=metric";
https.get(url, function(response){
  response.on("data", function(data){
    const weatherData = JSON.parse(data);

    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const imgurl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
    res.write("<h1>the tempreature in " + query +" is " + temp +" Celcius.</h1>");

    res.write("<img src=" + imgurl + ">");
    res.send();
  });
});
});


app.listen(3000,function(){
  console.log("server is running at port 3000.");
});
