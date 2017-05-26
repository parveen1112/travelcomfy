/*
    Here, we are initializing the order of middlewares
 */
"use strict";

module.exports = {
    order: [
        'session',
        'request-parsers',
        'router',
        'not-found',
        '5xx'
    ],
    initialize: function(app){
        var middleware;
        this.order.forEach(function(item){
            middleware = require('./' + item);
            (new middleware()).init(app);
        });
    }
}