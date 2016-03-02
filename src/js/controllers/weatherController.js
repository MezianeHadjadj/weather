/**
 * Created by meziane on 29/02/16.
 */

//angular.module('content', [])
angular.module('core', ['content','weatherService']);
angular.module('content', [])

    .controller('mainController', ['$scope','$http', 'Weather', function($scope, $http, Weather) {
             $scope.get_weather=function(callback) {
                var WeatherService=require("./../services/weather");
                if (navigator.geolocation) {
                    chrome.runtime.sendMessage({command: "actual_location"}, function (response) {
                        console.log(JSON.stringify(response));
                        var GetWeather = WeatherService.GetWeather("Tizi ouzou", function (result) {
                            result = JSON.parse(result)
                            callback(result)

                        });

                    });
                } else {
                    console.log("Show a popup ask for location permission or tap her location.")
                }
            };
        Weather.get_weather(function(result){
            console.log('+result+' + result["weather"][0]["main"]);
            //get situation
            if (result["weather"][0]["main"]=="Clear"){
                $scope.sun=true;
                $scope.situation="Clear";

            }else{

            }
            // get temperature temp-273.15
            $scope.temp= (result["main"]["temp"]-273.15).toFixed(2);
            //get humidity
            $scope.humidity=result["main"]["humidity"];
            $scope.speed=result["wind"]["speed"]
            $scope.$apply();

        });



}]);
