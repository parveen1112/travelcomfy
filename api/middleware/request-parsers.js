"use strict";

var Middleware = require("./base-middleware");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


class RequestParser extends Middleware{
    constructor(){
        super();
    }
    init(app){
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(cookieParser());
    }
}

module.exports = RequestParser;