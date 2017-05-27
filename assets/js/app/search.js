/**
 * Main File
 */
define(['jquery'], function(){

    var $sliderMin = $('.slider-min'),
        $sliderMax = $('.slider-max');

    /**
     * This function is used to Display Search results
     * @param data
     */
    function searchResults(data) {
        var resultHTML = '',
            $list = $('ul.flight-results');

        switch (data.success) {
            case true:
                for (var i=0; i < data.data.length; i++) {
                    var flight = data.data[i];
                    resultHTML += window.templates.flightResult({data : flight.towards, returns : flight.returns || ''});
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
            mn = $sliderMin.text(),
            mx = $sliderMax.text(),
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

        session.setSession('mx', mx);
        session.setSession('mn', mn);
        session.setSession('passengers', passengers);
        session.setSession('arrivalTime', arrivalTime);
        session.setSession('departTime', departTime);
        session.setSession('source', source);
        session.setSession('dest', dest);

        queryString = queryArray.length ? '?' + queryArray.join('&') : '';
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
     * This function is used to get Data from Session
     */
    function getDataFromSession() {
        var mx = session.getSession('mx'),
        mn = session.getSession('mn'),
        passengers = session.getSession('passengers'),
        arrivalTime = session.getSession('arrivalTime'),
        departTime = session.getSession('departTime'),
        source = session.getSession('source'),
        dest = session.getSession('dest'),
        activeTab = $('#form-filter .tab-block.active');

        if (departTime && source && dest) {
            activeTab.find('.source select').val(source);
            activeTab.find('.destination select').val(dest);
            activeTab.find('.depart-time input').val(departTime);
            activeTab.find('.arrival-time input').val(arrivalTime);
            activeTab.find('.passengers select').val(passengers);
            $sliderMin.html(mn);
            $sliderMax.html(mx);

            srchFilterHandler();
        }

     }
    /**
     * This function is used to bind Events
     */
    function bindEvents(){
        $(document).on('click', '#filter-src-btn', srchFilterHandler);
    }

    /**
     * Initialising the Component
     */
    function init(){
        bindEvents();
        getDataFromSession();
    }

    return {
        init : init
    };
});