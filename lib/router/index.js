/**
 * Customer Router to initialize routes
 * @param app Express Router
 * @constructor
 */
var Router = function (app) {
    this.router = app;
}
/**
 * Function to add Routes
 * @param route Route
 * @param chain Route Chain
 * @param method Route Method
 */
Router.prototype.add = function(route,controller, method, policies) {
    var routeChain = [];
    for (var i = 0; i < policies.length; i++){
        routeChain.push(this.getPolicies(policies[i]));
    }
    routeChain.push(this.getControllerCallback(controller));
    this.router[method](route, routeChain);
}

/**
 * Converting method to promise and handling next calls
 * @param service Method from routes.js
 * @returns {Function}
 */
Router.prototype.getControllerCallback = function (service) {
    return function (req, res, next) {
        Promise.all([service(req, res)]).catch(function (err) {
            next(err);
        });
    }
};

/**
 * Converting method to promise and handling next calls
 * @param service Method from routes.js
 * @returns {Function}
 */
Router.prototype.getPolicies = function (policy) {
    return function (req, res, next) {
        Promise.all([policy(req, res)]).then(function (response) {
            next();
        }).catch(function (err) {
            next(err);
        });
    }
};


module.exports = {
    // Function to initialize Router
    initialize : function(app, routeConfiguration) {
        var router = new Router(app);
        for(var i=0; i <routeConfiguration.length; i++) {
            router.add(routeConfiguration[i]['route'], routeConfiguration[i]['controller'], routeConfiguration[i]['method'] || 'get', routeConfiguration[i]['policies'] || []);
        }
    }
}