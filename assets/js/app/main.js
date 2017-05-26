define(['./slider', './tab', 'underscore'], function(slider, tab){
    /**
     * This function is used to bind Events
     */
    function bindEvents(){
        slider.init();
        tab.init();
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