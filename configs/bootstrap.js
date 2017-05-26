var Logger = require('./../lib/logger'),
    path = require('path'),
    Router = require('../lib/router'),
    helpers = require('../api/helpers');


module.exports = function (bootstrapLocation, router) {
    var env_config;
    global.appSys = {
        config : {},
        env : process.env.NODE_ENV || 'development'
    };
    global.helpers = helpers;

    // Requiring base config
    appSys.config = require(path.join(bootstrapLocation, 'configs', 'config.js'));

    // Requiring environment based configs
    if(appSys.env){
        env_config = require(path.join(bootstrapLocation, 'configs', 'env', appSys.env + '.js'));
    }

    // Config Merging
    helpers.merge(appSys.config, env_config);

    //Global log Instance
    global.log = new Logger(appSys.config.logs, true);
};

