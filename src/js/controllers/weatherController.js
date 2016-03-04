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
                $scope.class0="weather time-morning active";
                $scope.weather_icon="sun";
                $scope.weather_icon1="";
                $scope.situation="Clear";
                $scope.dots="";

            }else if(result["weather"][0]["main"]=="Rain"  ){
                $scope.class0="weather time-evening";
                $scope.weather_icon="cloud";
                $scope.weather_icon1="";
                $scope.situation="Rain";
                $scope.dots="sprinkles";
            }else if( result["weather"][0]["main"]=="Clouds" ){
                $scope.class0="weather time-evening";
                $scope.weather_icon="cloud";
                $scope.weather_icon1="sun";
                $scope.situation="Clouds";
                $scope.dots="";
            }

            $scope.$apply();

            // get temperature temp-273.15
            $scope.location=result["name"];
            $scope.temp= (result["main"]["temp"]-273.15).toFixed(2);
            //get humidity
            $scope.humidity= "Humidity: " + result["main"]["humidity"] +" %";
            $scope.speed= "Wind: " + result["wind"]["speed"] +" speed";
            $scope.$apply();

        });


        Weather.get_next_weather(function(result){
            $scope.days=[0,0,0];
            var days=["First day", "Second day", "Third day"]
            for (var i=0; i<3; i++){
                $scope.days[i]={}
                $scope.days[i]["situation"]=result["list"][i]["weather"][0]["main"];
                $scope.days[i].temp=(result["list"][i]["main"]["temp"]-273.15).toFixed(2);
                $scope.days[i].humidity=result["list"][i]["main"]["humidity"];
                $scope.days[i].speed=result["list"][i]["wind"]["speed"];
                $scope.days[i].date= days[i];
                // icons
                if (result["list"][i]["weather"][0]["main"]=="Clear"){
                    $scope.days[i].class0="weather time-morning active";
                    $scope.days[i].weather_icon="sun";
                    $scope.days[i].weather_icon1="";
                    $scope.days[i].situation="Clear";
                    $scope.days[i].dots="";

                }else if(result["list"][i]["weather"][0]["main"]=="Rain"  ){
                    $scope.days[i].class0="weather time-evening";
                    $scope.days[i].weather_icon="cloud";
                    $scope.days[i].weather_icon1="";
                    $scope.days[i].situation="Rain";
                    $scope.days[i].dots="sprinkles";
                }else if( result["list"][i]["weather"][0]["main"]=="Clouds" ){
                    $scope.days[i].class0="weather time-evening";
                    $scope.days[i].weather_icon="cloud";
                    $scope.days[i].weather_icon1="sun";
                    $scope.days[i].situation="Clouds";
                    $scope.days[i].dots="";
                }

            }
            $scope.$apply();


          });


}]);
