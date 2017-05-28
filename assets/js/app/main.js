/**
 * Main File
 */
define(['slider', 'tab', 'search', 'config', 'session', 'template', 'underscore'], function(slider, tab, search, config, session){
    /**
     * This function is used to bind Events
     */
    function bindEvents(){
        window.config = config;
        window.session = session;
        tab.init();
        slider.init();
        search.init();
    }

    /**
     * Initialising the Component
     */
    function init(){
        bindEvents();
    }

    return {
        init : init
    };
});