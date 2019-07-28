const user_key = '2a424d77579d56c5cb91ae9794c57995';
const google_maps_api = 'AIzaSyDsCDKZW5hk6Bn6bxiIKnBMUMUB82TAlaM'; // need to have account upgraded for billing in order for this feature to work

var api_key = 'CODE_SAMPLES_KEY_9d3608187'; // Get your API key at developer.betterdoctor.com
var searchField = 'doctors'; // create dropdown list with these options
var searchLocation = 'need to find how to get users location';

var doctorsUrl = `https://api.betterdoctor.com/2016-03-01/${searchField}?location=37.773,-122.413,100&skip=2&limit=10&user_key=` + api_key;
var googleMapsUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=37.773%2c%20-122.413&zoom=12&size=400x400&key=' + google_maps_api


var googleMap = $('<img>');
googleMap.attr('src', googleMapsUrl);

$('.map').append(googleMap);

// 1. Use doctors api to be able to show on the html page
// 2. find out how to extract the 
// response.data[0].practices[0].lat
// response.data[0].practices[0].lon

// 37.773,-122.413


$.ajax({
method: "GET",
url: doctorsUrl
}).then(function(response)
{
console.log(response);
// Capture the latitude through the doctors api
console.log(response.data[0].practices[0].lat);
// Capture the longitude the doctors api
console.log(response.data[0].practices[0].lon);
});




// User types into an input box with a symtom. The input box should drop down with recommendations of the symptom
// When the user 

// https://www.doximity.com/developers/home'
// https://rapidapi.com/palanen/api/betterdoctor-doctor-and-provider-data
// https://developer.betterdoctor.com/
// https://developer.betterdoctor.com/code-samples
// https://cloud.google.com/maps-platform/pricing/

// Health application where the user searches a medical condition. The user gets back information about the 
// condition and they will also receive a list of doctors in the area with information about the doctors.

// Return a map using the doctors address. Look for pharmacies in the area and plan a route.
