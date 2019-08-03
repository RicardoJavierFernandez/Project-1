var apiKey = "a75ed9f3d207fbac50108132859cde38";
var queryUrl = "https://api.betterdoctor.com/2016-03-01/doctors?query=toothache&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=" + apiKey;

$.ajax({
    method: "GET",
    url: queryUrl

}).then(function(response) {
    console.log(response);
});

var mapsApiKey = "AIzaSyC680s65s2mIijPfhMUgvuuGyiJqt0olOA";
var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=' + mapsApiKey;
var locationLat = 33.038824;
var locationLon = -117.285627;

$.ajax({
    method: "GET",
    url: mapUrl

}).then(function(response) {
    console.log(response);
    $("#map").append($("<img>").attr("src", mapUrl))


});