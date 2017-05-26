/**
 * Bundling Client Side Templates in main.js
 */
define(['../templates/flight-result'], function(flightResult){
    window.templates = {
        flightResult : flightResult
    };
});