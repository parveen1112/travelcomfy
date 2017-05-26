/*
    Base Middleware class
 */
"use strict";
class Middleware{
    constructor(){}
    init(app){
        if(typeof this.action === 'function'){
            app.use(this.action);
        }
    }
}

module.exports = Middleware;