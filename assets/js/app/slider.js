/**
 * Handling Slider functionality
 */
define(['jquery-ui'], function(){
    var $slider = $('#range-slider');

    function initializeSlider(){
        var min = $slider.data('min'),
            max = $slider.data('max');

        $slider.slider({
            range: true,
            min: min,
            max: max,
            values: [min, max],
            slide: function (e, ui) {
                var $parent = $(this).parent(),
                    minTag = $parent.find('.slider-min'),
                    maxTag = $parent.find('.slider-max');
                minTag.html(ui.values[0]);
                maxTag.html(ui.values[1]);
            }
        });
    }

    return {
        init: function(){
            initializeSlider();
        }
    };

});