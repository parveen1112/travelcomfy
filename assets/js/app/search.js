/**
 * Main File
 */
define(['jquery'], function(){

    var $sliderMin = $('.slider-min'),
        $sliderMax = $('.slider-max');

    /**
     * This function is used to render the data
     * @param data
     */
    function renderData(resultHTML, data) {
        var $list = $('ul.flight-results'),
            $flightBlocks = $('.flights-block .flight-search-details'),
            $heading = $flightBlocks.find('.fl-heading h2'),
            $departSelected = $flightBlocks.find('.depart-selected'),
            $arrivalSelected = $flightBlocks.find('.arrival-selected'),
            $departLabel = $flightBlocks.find('.depart-label'),
            $arrivalLabel = $flightBlocks.find('.arrival-label'),
            flight,
            flightReturn;

        if (resultHTML) {
            flight = data.towards[0];
            flightReturn = data.returns ? data.returns[0] || '' : '';
            $flightBlocks.removeClass('hide');
            $list.html(resultHTML);
            $heading.html(flight.source + " > " + flight.dest + " > " + flight.source);
            $departSelected.html(flight.departTime);
            $departLabel.removeClass('hide');
            if (flightReturn) {
                $arrivalSelected.html(flightReturn.arrivalTime);
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
        renderData(resultHTML, data.data);
    }

    /**
     * This function is used to search the results
     */
    function srchFilterHandler(event) {
        if (event) {
            event.preventDefault();
        }
        var activeTab = $('.flight-tabs .tab-block.active'),
            queryArray = [],
            passengers = activeTab.find('.passengers select option:selected').text(),
            mn = $sliderMin.text(),
            mx = $sliderMax.text(),
            queryString,
            url,
            source = activeTab.find('.source select option:selected').text(),
            dest = activeTab.find('.destination select option:selected').text(),
            departTime = activeTab.find('.depart-time input').val(),
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

        url = config.searchUrl + source + '/' + dest + '/' + departTime.replace(/-/gi, '') + '/';
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
            activeTab = $('.flight-tabs .tab-block.active'),
            arrivalTime = session.getSession('arrivalTime'),
            departTime = session.getSession('departTime'),
            source = session.getSession('source'),
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
        $('#form-round-trip').on('submit', srchFilterHandler);
        $('#form-one-way').on('submit', srchFilterHandler);
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