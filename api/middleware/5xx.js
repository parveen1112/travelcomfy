"use strict";

var Middleware = require("./base-middleware");

class ServerErrorMiddleware extends Middleware {
    constructor() {
        super();
    }

    action(err, req, res, next) {
        var logs = {};
        logs.cause = req.url + " : " + err.code + " " + err.name + " " + err.message;
        let code = err.errorCode ? err.errorCode.key ? err.errorCode.key : 500 : 500;
        var errMsg = req.url + " : " + code;
        log.error({message: errMsg, req: req, error: err, userId : err.userId || ''});
        return res.status(+code).send(code || '500', err.message);
    }
}

module.exports = ServerErrorMiddleware;