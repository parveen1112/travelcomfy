/**
 * Main File
 */
define(['jquery'], function(){

    var $sliderMin = $('.slider-min'),
        $sliderMax = $('.slider-max'),
        source, dest, departTime, arrivalTime;

    /**
     * This function is used to render the data
     * @param data
     */
    function renderData(resultHTML) {
        var $list = $('ul.flight-results'),
            $flightBlocks = $('.flights-block .flight-search-details'),
            $heading = $flightBlocks.find('.fl-heading h2'),
            $departSelected = $flightBlocks.find('.depart-selected'),
            $arrivalSelected = $flightBlocks.find('.arrival-selected'),
            $departLabel = $flightBlocks.find('.depart-label'),
            $arrivalLabel = $flightBlocks.find('.arrival-label');

        if (resultHTML) {
            $flightBlocks.removeClass('hide');
            $list.html(resultHTML);
            $heading.html(source + " > " + dest + " > " + source);
            $departSelected.html(departTime);
            $departLabel.removeClass('hide');
            if (arrivalTime) {
                $arrivalSelected.html(arrivalTime);
                $arrivalLabel.removeClass('hide');
            }
        } else {
            $list.html('<p class="no-result">' + config.noResultFlight + '</p>');
            $flightBlocks.addClass('hide');
        }

    }
    /**
     * This function is used to Display Search results
     * @param data
     */
    function searchResults(data) {
        var resultHTML = '';

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
        renderData(resultHTML);
    }

    /**
     * This function is used to search the results
     */
    function srchFilterHandler() {
        var activeTab = $('#form-filter .tab-block.active'),
            url = config.searchUrl + source + '/' + dest + '/' + departTime.replace(/-/gi, '') + '/',
            queryArray = [],
            passengers = activeTab.find('.passengers select option:selected').text(),
            mn = $sliderMin.text(),
            mx = $sliderMax.text(),
            queryString;

        source = activeTab.find('.source select option:selected').text();
        dest = activeTab.find('.destination select option:selected').text();
        departTime = activeTab.find('.depart-time input').val();
        arrivalTime = activeTab.find('.arrival-time input').val();

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

        if (departTime && source && dest) {
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
    }

    /**
     * This function is used to get Data from Session
     */
    function getDataFromSession() {
        var mx = session.getSession('mx'),
            mn = session.getSession('mn'),
            passengers = session.getSession('passengers'),
            activeTab = $('#form-filter .tab-block.active');

        arrivalTime = session.getSession('arrivalTime');
        departTime = session.getSession('departTime');
        source = session.getSession('source');
        dest = session.getSession('dest');

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
        init : init,
        getResults : srchFilterHandler
    };
});