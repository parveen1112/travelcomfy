define(function(){
    function tabButtonHandler(){
        var activeBlock = $(this).data('tab');
        $('.tab-btn').removeClass('tab-active');
        $('.tab-block').removeClass('active');
        $(this).addClass('tab-active');
        $(activeBlock).addClass('active');
    }
    function bindEvents(){
        $(document).on('click', '.flight-tabs .tab-btn', tabButtonHandler);
    }
    return {
        init: function(){
            bindEvents();
        }
    };
});