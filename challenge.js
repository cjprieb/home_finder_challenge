if ( Meteor.isClient ) {
    Session.setDefault("UserLocation", "No Where, KS");
    Session.setDefault("NumberOfHomes", 1);
    Meteor.subscribe("locations");
};

if ( Meteor.isServer ) {
    var ipAddress = "";
    
    Meteor.onConnection(function(conn) {
        ipAddress = conn.clientAddress.indexOf("127.0.0.1") == 0 ? "74.125.45.100" : conn.clientAddress; 
        testIp(conn.id, ipAddress);
    });

    Meteor.publish("locations", function() {
        var loc = Locations.find({'ip': ipAddress});
        console.log("locations found for " + ipAddress + ": " + loc.count());
        return loc; 
    });
}

function testIp(userId, ipAddress) {
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
    if ( Locations.find({'ip' : ipAddress}).count() === 0 ) {
        console.log("adding location for " + ipAddress + ": " + location);
        Locations.insert(location);
    }
}
        
function freeGeoIp(userId, ipAddress) {
    var url = "https://freegeoip.net/json/" + ipAddress;
    console.log("sending api request to "  + url);
    
    var result = HTTP.get(url);
    if ( result !== null && result !== undefined ) {
        var location = JSON.parse(result.content);
        console.log("user location for " + userId + ": " + location.city + ", " + location.region_code);
        Locations.insert({_id: userId, location: location});
        //Session.set("UserLocation", result.content);
    }
    else {            
        console.log("no result found: " + result);
    }
} 