angular.module('weatherService', [])

    .factory('Weather', ['$http',function($http) {

        return {
            get_weather : function(callback) {
                var WeatherService=require("./weather");
                if (navigator.geolocation) {
                    chrome.runtime.sendMessage({command: "actual_location"}, function (response) {
                        var GetWeather = WeatherService.GetWeather(response, function (result) {
                            console.log("webegn"+ result);
                            result = JSON.parse(result);
                            console.log("weend");
                            callback(result);
                        });

                    });
                } else {
                    console.log("Show a popup ask for location permission or tap her location.")
                }


            },
            get_next_weather: function(callback){
                var WeatherService=require("./weather");
                if (navigator.geolocation) {
                    chrome.runtime.sendMessage({command: "actual_location"}, function (response) {
                        var GetWeather = WeatherService.GetNextWeather(response, function (result) {
                           console.log("start:" + result);
                            result=JSON.parse(result);
                            console.log("enddd");
                            callback(result);
                        });

                    });
                } else {
                    console.log("Show a popup ask for location permission or tap her location.")
                }

            }
        }

    }]);