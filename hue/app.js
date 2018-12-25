var request = require("request");
var authorizedUser = "";
var hueIp = "";
var queryUrl = `http://${hueIp}/api/${authorizedUser}/lights/8/state`; // url base for API
var queryUrl2 = `http://${hueIp}/api/${authorizedUser}/lights/7/state`; // url base for API
var bit = 1;

var PutRequest = function(url, method, json) { // constructor function for PUT requests
    this.url = url;
    this.method = method;
    this.json = json;
} 

var five = require("johnny-five"),
    board, button;

board = new five.Board();

board.on("ready", function () {

    button = new five.Button(2);

    board.repl.inject({
        button: button
    });

    // Button Event API

    // "down" the button is pressed
    button.on("down", function () {
        if (bit === 0) {
            request(new PutRequest(`${queryUrl}`, 'PUT', {
                on: true
            }), (err) => {
                if (err) console.log(`State change on light 8 was unsuccessful!`);
            });
            request(new PutRequest(`${queryUrl2}`, 'PUT', {
                on: true
            }), (err) => {
                if (err) console.log(`State change on light 7 was unsuccessful!`);
            });
            bit = 1;
        } else if (bit >= 1) {
            request(new PutRequest(`${queryUrl}`, 'PUT', {
                on: false
            }), (err) => {
                if (err) console.log(`State change on light 8 was unsuccessful!`);
            });
            request(new PutRequest(`${queryUrl2}`, 'PUT', {
                on: false
            }), (err) => {
                if (err) console.log(`State change on light 7 was unsuccessful!`);
            });
            bit = 0;
        }
    });

    // "hold" the button is pressed for specified time.
    //        defaults to 500ms (1/2 second)
    //        set
    button.on("hold", function () {

        if (bit === 1) {
            request(new PutRequest(`${queryUrl}`, 'PUT', {bri: 50}), (err) => {
                if (err) console.log(`State change on light was unsuccessful!`);
            });
            request(new PutRequest(`${queryUrl2}`, 'PUT', {bri: 50}), (err) => {
                if (err) console.log(`State change on light was unsuccessful!`);
            });
            bit = 2;
        } else if (bit >= 2) {
            request(new PutRequest(`${queryUrl}`, 'PUT', {bri: 255}), (err) => {
                if (err) console.log(`State change on light was unsuccessful!`);
            });
            request(new PutRequest(`${queryUrl2}`, 'PUT', {bri: 255}), (err) => {
                if (err) console.log(`State change on light was unsuccessful!`);
            });
            bit = 1;
        }
    });

    // "up" the button is released
    button.on("up", function () {
        console.log("up");
    });
});