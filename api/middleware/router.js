"use strict";

var Middleware = require("./base-middleware");
var express = require('express');
var router = express.Router();
var path = require('path');
var Router = require('../../lib/router');

class RouteMiddleware extends Middleware{
    constructor(){
        super();
    }

    init(app){
        Router.initialize(router, require('../../api/routes'));
        app.use(express.static(__dirname + '/../../public'));
        app.use('/', router);
    }
}

module.exports = RouteMiddleware;
