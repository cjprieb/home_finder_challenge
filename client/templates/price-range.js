//
// Influenced by https://github.com/rcy/meteor-nouislider/blob/master/example/example.js
//
Template.priceRange.rendered = function() {
    var $slider = this.$(".price-range-slider .slider");
    var $minLabel = this.$(".min-value");
    var $maxLabel = this.$(".max-value");
    var $averageLabel = this.$(".average-value");
        
    var selectedPriceRange = Session.get("PriceRange");
    var average = $slider.data("average");
    var min = $slider.data("min");
    var max = $slider.data("max");
    
    $slider.noUiSlider({
        start: selectedPriceRange,
        connect: true,
        step: 5000,
        range: {
            'min': min,
            'max': max
        }
    }).on('slide', function(event, values) {
        //set real values on 'slide' event
        setPriceRange(values);
    }).on('change', function(event, values) {
        //round off values on 'change' event
        setPriceRange(values);  
    });
    
    function setPriceRange(values) {
        values = [Math.round(values[0]),Math.round(values[1])];
        Session.set("PriceRange", values);
        
        updateLabelLocation($minLabel, $slider.find(".noUi-handle-lower"));
        updateLabelLocation($maxLabel, $slider.find(".noUi-handle-upper"));
    }
    
    function updateLabelLocation(label, handle) {
        var left = handle.parent().css("left");
        console.log("left for handle: " + left);
        label.css("left", left);
    }
    
    function updateAverageLocation(min, average, max) {        
        var averageLocation = ((average-min) * 100) / (max - min);
        $averageLabel.css("left", averageLocation + "%");
        var width = $averageLabel.width();
        var padding = parseInt($averageLabel.css("padding-left"));
        $averageLabel.find(".fa").css("left", width/2 + padding)
    }
    
    setPriceRange(selectedPriceRange);//init slider labels
    updateAverageLocation(min, average, max);
};

Template.priceRange.helpers({
   selectedMinStr: function() {
       return formatPrice(Session.get("PriceRange")[0], this.max);
   },
   selectedMaxStr: function() {
       return formatPrice(Session.get("PriceRange")[1], this.max);
   },
   averageStr: function() {
       return formatPrice(this.average, this.max) + " Average";
   }
});

function formatPrice(value, max) {
    var str = value + "";//make string
    if ( value >= 1000000 ) {
        str = accounting.formatMoney(value / 1000000, "$", 2) + "M";
    }
    else {
        str = accounting.formatMoney(value, "$", 0);
    }
    return str + (max === value ? "+" : "");
}