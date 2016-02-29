var request = require('request');

var WeatherService={


    GetWeather : function(location) {
                var url = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&APPID=e376febd4fa2e5f5678a657617e1cf63"

                chrome.runtime.sendMessage({
                    method: 'GET',
                    action: 'xhttp',
                    url: url

                }, function(responseText) {
                    console.log(responseText);
                });

            }



};

module.exports = WeatherService;
