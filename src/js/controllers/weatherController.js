/**
 * Created by meziane on 29/02/16.
 */

//angular.module('content', [])
angular.module('core', ['content','weatherService']);
angular.module('content', [])

    .controller('mainController', ['$scope','$http', 'Weather', function($scope, $http, Weather) {

        var WeatherService=require("./../services/weather");
        Weather.get_weather(function(result){

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


        Weather.get_next_weather(function(result){
            console.log("NEXT RESULT"+JSON.stringify(result))
            $scope.day1={};
            $scope.day1.situation=result["list"][0]["weather"][0]["main"];
            $scope.day1.temp=(result["list"][0]["main"]["temp"]-273.15).toFixed(2);
            $scope.day1.humidity=result["list"][0]["main"]["humidity"];
            $scope.day1.speed=result["list"][0]["wind"]["speed"];

            $scope.day2={};
            $scope.day2.situation=result["list"][1]["weather"][0]["main"];
            $scope.day2.temp=(result["list"][1]["main"]["temp"]-273.15).toFixed(2);
            $scope.day2.humidity=result["list"][1]["main"]["humidity"];
            $scope.day2.speed=result["list"][1]["wind"]["speed"];

            $scope.day3={};
            $scope.day3.situation=result["list"][2]["weather"][0]["main"];
            $scope.day3.temp=(result["list"][2]["main"]["temp"]-273.15).toFixed(2);
            $scope.day3.humidity=result["list"][2]["main"]["humidity"];
            $scope.day3.speed=result["list"][2]["wind"]["speed"];
            $scope.$apply();

          });


}]);
