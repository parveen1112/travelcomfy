/**
 * Main File
 */
define(['slider', 'tab', 'search', 'config', 'session', 'template', 'underscore'], function(slider, tab, search, config, session){
    function initializeDatePicker(){
        $('.depart-time-inp').datepicker({ dateFormat: 'yy-mm-dd' });
        $('.arrival-time-inp').datepicker({ dateFormat: 'yy-mm-dd' });
    }
    /**
     * This function is used to bind Events
     */
    function bindEvents(){
        window.config = config;
        window.session = session;
        initializeDatePicker();
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