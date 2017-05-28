"use strict";

var Middleware = require("./base-middleware");

class NotFound extends Middleware{
    constructor(){
        super();
    }
    action(req, res){
        var errMsg = req.url + " : " + '404';
        log.error({message: "HTTP 404", req: req});
        return res.status(404).render('404.ejs');
    }
}

module.exports = NotFound;