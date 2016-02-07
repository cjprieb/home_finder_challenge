Template.homeFinder.helpers({
    location: function() {
        var loc = Locations.findOne();
        return loc !== undefined ? loc.city + ", " + loc.region_code : "";
    },
    homesForSaleString: function() {
        var numHomes = 25; //TODO: get data from database
        var homesStr = numHomes == 1 ? "Home" : "Homes";
        return numHomes + " " + homesStr + " for Sale";
    },
    rangeData: function() {
        return {//TODO: get data from database
            min: 85000,
            max: 2500000,
            average: 378000
        };
    },
    houseTypes: function() {
        return [
            {
                label: "House", 
                icon:"fa-home",
                selected: false
            },
            {
                label: "Condo", 
                icon:"fa-building",
                selected: false
            },
            {
                label: "Apartment", 
                icon:"fa-building",
                selected: false
            },
            {
                label: "Townhome", 
                icon:"fa-home",
                selected: false
            },
        ];
    },
    mustHaves: function() {
        return [
            {label: "Bedrooms"},
            {label: "Bathrooms"},
            {label: "Square Feet"},
            {label: "Lot Size"}
        ];
    }
});