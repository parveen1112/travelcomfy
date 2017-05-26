var express = require('express'),
    app = express(),
    bootstrap = require('./configs/bootstrap'),
    middleware = require('./api/middleware');

//Landing Zone
global.LZ = __dirname;

// Bootstraping our application - Logger, configs etc
bootstrap(LZ);

// set the view engine to ejs
app.set('view engine', appSys.viewEngine);
app.set('views', __dirname + '/views');

//Initializeing the middlewares
middleware.initialize(app);

/**
 * Uncaught Exception handling
 * Any unhandled exception will be catch and processed here
 */
process.on('uncaughtException', function (err) {
    console.log('uncaughtException===' + err);
    console.error(err.stack);
});


process.on('unhandledRejection', function (err, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", err.stack);
});

//Disabled X-Powered-By
app.disable('x-powered-by');

app.listen(appSys.config.port, function(){
    log.info('-------------------Application Started-----------------' + appSys.config.port);
});