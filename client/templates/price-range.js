//
// Influenced by https://github.com/rcy/meteor-nouislider/blob/master/example/example.js
//
Template.priceRange.rendered = function() {
    var $slider = this.$(".priceRangeSlider");
    if ( $slider.data('noUiSlider') ) return;
    
    $slider.noUiSlider({
        start: [$slider.data("selected-min"), $slider.data("selected-max")],
        connect: true,
        step: 1000,
        range: {
            'min': $slider.data("min"),
            'max': $slider.data("max")
        }
    }).on('slide', function(event, value) {
        //set real values on 'slide' event
        console.log("slide: " + value);
        $slider.data("selected-min", value[0]);
        $slider.data("selected-max", value[1]);
    }).on('change', function(event, value) {
        //round off values on 'change' event
        $slider.data("selected-min", Math.round(value[0]));
        $slider.data("selected-max", Math.round(value[1]));  
    });
}
/**/
/*Template.priceRange.events({
    'change .priceRangeSlider': function(event, value) {
        this.selectedMin = Math.round(value[0]);
        this.selectedMax = Math.round(value[1]);        
    }
});*/