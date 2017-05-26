define(function(){
    function tabButtonHandler(){
        alert('Hello');
        var activeBlock = $(this).data('tab');
        $('.tab-block').removeClass('active');
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