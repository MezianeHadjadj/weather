angular.module('weatherService', [])

    .factory('Weather', ['$http',function($http) {

        return {
            get_weather : function(callback) {
                var WeatherService=require("./weather");
                if (navigator.geolocation) {
                    chrome.runtime.sendMessage({command: "actual_location"}, function (response) {
                        console.log(JSON.stringify(response));
                        var GetWeather = WeatherService.GetWeather("Tizi ouzou", function (result) {
                            result = JSON.parse(result);
                            callback(result);
                        });

                    });
                } else {
                    console.log("Show a popup ask for location permission or tap her location.")
                }


            },
            get_next_weather: function(callback){
                console.log("next")
                var WeatherService=require("./weather");
                if (navigator.geolocation) {
                    chrome.runtime.sendMessage({command: "actual_location"}, function (response) {
                        var GetWeather = WeatherService.GetNextWeather("Tizi ouzou", function (result) {
                            result = JSON.parse(result);
                            callback(result);
                        });

                    });
                } else {
                    console.log("Show a popup ask for location permission or tap her location.")
                }

            }
        }

    }]);