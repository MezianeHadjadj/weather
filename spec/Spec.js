var request = require("request");
var app_file = require("../index.js")
var base_url = "http://localhost:9005/"
var weather=require("../src/js/services/weather.js");

describe("Test notes apis", function() {
    describe("GET /", function() {
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });



    });
});
