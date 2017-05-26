"use strict";

var winston = require('winston');

/**
 * This function is used to stringify the Object on the basis of environment.
 * @param object
 */
function stringify(object){
    return process.env.NODE_ENV === 'development' ? JSON.stringify(object, null, 4) : JSON.stringify(object);
}

/**
 *
 * @param content Log Content
 * @param isError Error Log true/false
 * @returns {*}
 */
function LogFormatter(content, isError) {
    var obj = {};
    if (content.length === 1 && typeof content[0] === 'string') {
        obj.message = content[0];
    } else {
        content.forEach(function (arg, key) {
            if (typeof arg === 'string') {
                obj.message = arg;
            }
            else {
                Object.keys(arg).forEach(function(key) {
                    if (key === 'req') {
                    obj.clientRequest = {
                        "headers": arg[key].headers,
                        "url": arg[key].url,
                        "query": arg[key].query
                    }
                    } else if (key === 'error') {
                        obj[key] = arg[key].stack || arg[key];
                    } else {
                        obj[key] = arg[key];
                    }
                 })
            }
        });
    }
    return isError ? obj : stringify(obj, null, 4);
}
/**
 * Logger Class
 */
class Logger {
    constructor(stream){
        this.logger = new winston.Logger({
            level: stream.level,
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)(stream)
            ]
        });
        this.logger.level = "silly";
        this.logger.cli();
    }
    trace () {
        return this.logger.log("trace", LogFormatter.call(this, Array.prototype.slice.call(arguments)));
    }

    debug () {
        return this.logger.log("debug", LogFormatter.call(this, Array.prototype.slice.call(arguments)));
    }

    info () {
        return this.logger.log("info", LogFormatter.call(this, Array.prototype.slice.call(arguments)));
    }

    warn () {
        return this.logger.log("warn", LogFormatter.call(this, Array.prototype.slice.call(arguments)));
    }

    error () {
        var payload =  LogFormatter.call(this, Array.prototype.slice.call(arguments), true);
        return this.logger.log("error", stringify(payload));
    }

    fatal () {
        return this.logger.log("fatal", LogFormatter.call(this, Array.prototype.slice.call(arguments)))
    }
}


module.exports = Logger;