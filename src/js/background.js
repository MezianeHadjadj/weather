/**
 * Created by meziane on 29/02/16.
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, callback) {

    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
        if (request.command == "actual_location") {

            navigator.geolocation.getCurrentPosition (function (position) {
                callback ( {"lat": position.coords.latitude ,"lng": position.coords.longitude }

                 );
            } );
            return true; // Needed because the response is asynchronous
        }

});