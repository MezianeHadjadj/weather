angular.module('weatherService', [])

    .factory('Weather', ['$http',function($http) {
        var WeatherService=require("./weather");
        return {

            get_weather : function(callback) {

                if (navigator.geolocation) {
                    chrome.runtime.sendMessage({command: "actual_location"}, function (response) {
                        var GetWeather = WeatherService.GetWeather(response, function (result) {
                            result = JSON.parse(result);
                            callback(result);
                        });
                    });
                } else {
                    console.log("Show a popup ask for location permission or tap her location.")
                }


            },
            get_next_weather: function(callback){
                if (navigator.geolocation) {
                    chrome.runtime.sendMessage({command: "actual_location"}, function (response) {
                        var GetWeather = WeatherService.GetNextWeather(response, function (result) {
                            result=JSON.parse(result);
                            callback(result);
                        });

                    });
                } else {
                    console.log("Show a popup ask for location permission or tap her location.")
                }

            }
        }

    }]);