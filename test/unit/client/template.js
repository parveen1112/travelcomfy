/**
 * Bundling Client Side Templates in main.js
 */
define(['public/js/templates/flight-result'], function(flightResult){
    window.templates = {
        flightResult : flightResult
    };
});