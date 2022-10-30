const { query } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { urlencoded } = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
   res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){
    console.log();
    const query = req.body.City_Name;
    const appKey = "77fd61a4867928468a8d34768e533d05";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appKey +"&units="+ unit +"";
    https.get(url, function(response){
        response.on("data", function(data){
            const weather_data = JSON.parse(data);
            const temp = weather_data.main.temp;
            const weatherDescription = weather_data.weather[0].description;
            const weatherIcon = weather_data.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            res.write("<p> The weather is currently "+weatherDescription+".</p>");
            res.write("<h1>Temperature in "+ query +" is "+weather_data.main.temp+" degrees celcius.</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        });

    });
})








app.listen(3000, function(){
    console.log("Listening to port 3000....");
});