var request = require('request');

var WeatherService={

    GetWeather : function(location ,callback) {
        //-51.973061, -22.8375 ]  -73.587807, 45.508839 ] ]
        //location.lng=-73.587807;
        //location.lat= 45.508839
                var url = "http://api.openweathermap.org/data/2.5/weather?lat="+location.lat+"&lon="+location.lng+"&APPID=e376febd4fa2e5f5678a657617e1cf63"
                chrome.runtime.sendMessage({
                    method: 'GET',
                    action: 'xhttp',
                    url: url
                }, function(responseText) {
                    callback( responseText);
                });

            },
    GetNextWeather : function(location, callback){
        //location.lng=-73.587807;
        //location.lat= 45.508839
        var url="http://api.openweathermap.org/data/2.5/forecast?lat="+location.lat+"&lon="+location.lng+"&cnt=3&APPID=e376febd4fa2e5f5678a657617e1cf63";
        chrome.runtime.sendMessage({
            method: 'GET',
            action: 'xhttp',
            url: url
        }, function(responseText) {
            callback( responseText);
        });

    }



};

module.exports = WeatherService;
