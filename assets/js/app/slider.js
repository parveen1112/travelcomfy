/**
 * Handling Slider functionality
 */
define(['search', 'jquery-ui'], function(search){
    var $slider = $('#range-slider'),
        getResults = _.debounce(search.getResults, 100);

    function initializeSlider(minSet, maxSet){
        var min = $slider.data('min'),
            max = $slider.data('max');

        $slider.slider({
            range: true,
            min: min,
            max: max,
            values: [minSet || min, maxSet || max],
            slide: function (e, ui) {
                var $parent = $(this).parent(),
                    minTag = $parent.find('.slider-min'),
                    maxTag = $parent.find('.slider-max');
                minTag.html(ui.values[0]);
                maxTag.html(ui.values[1]);
                getResults();
            }
        });
    }

    function getDataFromSession() {
        var min = session.getSession('mn'),
            max = session.getSession('mx');
        initializeSlider(min, max);
    }
    return {
        init: function(){
            getDataFromSession();
        }
    };

});