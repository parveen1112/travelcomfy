define(['./slider', './tab', 'config', 'template', 'underscore'], function(slider, tab, config){
    function searchResults(data) {
        var resultHTML = '',
            $list = $('ul.flight-results');

        switch (data.success) {
            case true:
                for (var i=0; i < data.data.length; i++) {
                    resultHTML += window.templates.flightResult({data : data.data[i]});
                }
                break;
            case false:
                 console.log(JSON.stringify(data));
        }
        if (resultHTML) {
            $list.html(resultHTML);
        } else {
            $list.html('<p class="no-result">' + config.noResultFlight + '</p>');
        }
    }
    /**
     * This function is used to search the results
     */
    function srchFilterHandler() {
        var activeTab = $('#form-filter .tab-block.active'),
            source = activeTab.find('.source select option:selected').text(),
            dest = activeTab.find('.destination select option:selected').text(),
            departTime = activeTab.find('.depart-time input').val(),
            arrivalTime = activeTab.find('.arrival-time input').val(),
            url = config.searchUrl + source + '/' + dest + '/' + departTime.replace(/-/gi, '') + '/',
            queryArray = [],
            passengers = activeTab.find('.passengers select option:selected').text(),
            mn = $('.slider-min').text(),
            mx = $('.slider-max').text(),
            queryString;

        if (passengers) {
            queryArray.push(config.passStr + '=' + passengers);
        }
        if (mn) {
            queryArray.push(config.mnStr + '=' + mn);
        }
        if (mx) {
            queryArray.push(config.mxStr + '=' + mx);
        }
        queryString = queryArray.length ? queryArray.join('&') : '';
        arrivalTime = arrivalTime ? arrivalTime.replace(/-/gi, '')  : '';

        $.ajax({
           method : 'GET',
           url : url + arrivalTime + queryString,
           context: this,
           success: searchResults,
           error: function() {
               console.log('Results not fetched');
           }
        });
    }

    /**
     * This function is used to bind Events
     */
    function bindEvents(){
        $(document).on('click', '#filter-src-btn', srchFilterHandler);
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