"use strict";

console.log("test");
var WeatherService= require("./weather");
console.log(WeatherService);
var GetWeather=WeatherService.GetWeather("Tizi ouzou");
console.log(GetWeather);
