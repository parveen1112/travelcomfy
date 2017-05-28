
require.config({
    baseUrl: "../../../",
    paths: {
        'jquery'        : 'assets/js/libs/vendor/jquery/dist/jquery',
        'underscore': 'assets/js/libs/vendor/underscore/underscore',
        'jquery-ui' : 'assets/js/libs/vendor/jquery-ui/jquery-ui',
        'config' : 'assets/js/app/config',
        'template' : 'test/unit/client/template',
        'session' : 'assets/js/app/session',
        'mainFile' : 'assets/js/app/main',
        'slider' : 'assets/js/app/slider',
        'tab' : 'assets/js/app/tab',
        'search' : 'assets/js/app/search',
        'mocha'         : 'node_modules/mocha/mocha',
        'chai'          : 'node_modules/chai/chai'

    },
    shim : {
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        "underscore": {
            exports: "_"
        }
    },
    urlArgs: 'bust=' + (new Date()).getTime()
});

define(function(require) {
    var chai = require('chai');
    require('mocha');
    require('jquery');

    window.expect = chai.expect;

    if (typeof window.initMochaPhantomJS === 'function') {
        window.initMochaPhantomJS();
    }

    mocha.setup('bdd');

    require([
        'spec-client.js',
    ], function(require) {
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        }
        else {
            mocha.run();
        }
    });

});
