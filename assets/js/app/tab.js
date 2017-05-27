/**
 * Handling Tab Functionality
 */
define(function(){
    /**
     * Tab Button handler
     */
    function tabButtonHandler(){
        var activeBlock = $(this).data('tab');
        $('.tab-btn').removeClass('tab-active');
        $('.tab-block').removeClass('active');
        $(this).addClass('tab-active');
        $(activeBlock).addClass('active');
        session.setSession('tab-block-index', $(this).index());
    }

    function getDataFromSession() {
        var index = session.getSession('tab-block-index');
        $('.flight-tabs .tab-btn').eq(index).click();
    }
    /**
     * Binding all the events
     */
    function bindEvents(){
        $(document).on('click', '.flight-tabs .tab-btn', tabButtonHandler);
    }

    return {
        init: function(){
            bindEvents();
            getDataFromSession();
        }
    };

});