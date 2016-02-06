var _houseTypes = [
    {
        label: "House", 
        icon:"fa-home"
    },
    {
        label: "Condo", 
        icon:"fa-building"
    },
    {
        label: "Apartment", 
        icon:"fa-building"
    },
    {
        label: "Townhome", 
        icon:"fa-home"
    },
];

var _mustHaves = [
    {
        label: "Bedrooms"
    },
    {
        label: "Bathrooms"
    },
    {
        label: "Square Feet"
    },
    {
        label: "Lot Size"
    }
]

var _priceRange = {
    min: 85000,
    selectedMin: 85000,
    max: 2500000,
    selectedMax: 2500000,
    average: 378000
}

Template.homeFinder.helpers({
    location: function() {
        try {
            var loc = Locations.findOne();
            return loc.city + ", " + loc.region_code;
        }
        catch (error) {
            console.log("Error getting location: " + error);
        }
        return "";
    },
    homesForSaleString: function() {
        var numHomes = Session.get("NumberOfHomes");
        var homesStr = numHomes == 1 ? "Home" : "Homes";
        return numHomes + " " + homesStr + " for Sale";
    },
    rangeData: function() {
        return _priceRange;
    },
    houseTypes: function() {
        return _houseTypes;
    },
    mustHaves: function() {
        return _mustHaves;
    }
});