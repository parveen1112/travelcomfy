/*global require*/

'use strict';

require.config({
    paths: {
        'jquery': '../js/libs/vendor/jquery/dist/jquery',
        'underscore': '../js/libs/vendor/underscore/underscore',
        'jquery-ui' : '../js/libs/vendor/jquery-ui/jquery-ui',
        'config' : '../js/app/config',
        'template' : '../js/app/template',
        'session' : '../js/app/session',
        'slider' : '../js/app/slider',
        'tab' : '../js/app/tab',
        'search' : '../js/app/search'
    },
    shim : {
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        "underscore": {
            exports: "_"
        }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main'], function(main){
    main.init();
});