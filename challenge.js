if ( Meteor.isClient ) {
    Session.setDefault("PriceRange", [100000,550000]);
    Meteor.subscribe("locations");
};

if ( Meteor.isServer ) {
    var ipAddress = "";
    
    Meteor.onConnection(function(conn) {
        ipAddress = conn.httpHeaders['x-forwarded-for'];
        if ( ipAddress === undefined ) {
            ipAddress = conn.clientAddress;
        }
        
        var location = freeGeoIp(conn.id, ipAddress);
        
        if ( Locations.find({'ip' : ipAddress}).count() === 0 && location !== null ) {
            console.log("adding location for " + ipAddress + ": " + location);
            Locations.insert(location);
        }
    });

    Meteor.publish("locations", function() {
        var loc = Locations.find({'ip': ipAddress});
        console.log("locations found for " + ipAddress + ": " + loc.count());
        return loc; 
    });
}

function getLocationforTestIp(userId, ipAddress) {
    var location = {
        "ip":"74.125.45.100",
        "country_code":"US",
        "country_name":"United States",
        "region_code":"OK",
        "region_name":"Oklahoma",
        "city":"Tulsa",
        "zip_code":"74172",
        "time_zone":"America/Chicago",
        "latitude":36.1543,
        "longitude":-95.9923,
        "metro_code":671
    };
    return location;
}
        
function freeGeoIp(userId, ipAddress) {
    var url = "https://freegeoip.net/json/" + ipAddress;
    console.log("sending api request to "  + url);
    
    var result = HTTP.get(url);
    if ( result !== null && result !== undefined ) {
        return JSON.parse(result.content);
    }
    else {            
        console.log("no result found for " + ipAddress);
        return null;
    }
} 