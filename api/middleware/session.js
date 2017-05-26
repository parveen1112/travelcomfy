"use strict";

var Middleware = require("./base-middleware"),
    session = require('express-session');;

class SessionMiddleware extends Middleware{
    constructor(){
        super();
    }
    init(app){
        app.use(session({
            name: "sid",
            rolling: true,
            saveUninitialized: true,
            resave: false,
            cookie: {maxAge: 1800},
            secret: '$J#A!B0N%GF%a$$sh!i0oN'
        }))
    }
}

module.exports = SessionMiddleware;


