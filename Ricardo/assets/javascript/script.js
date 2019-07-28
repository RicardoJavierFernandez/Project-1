var searchLocation = 'need to find how to get users location';
var medicalConditions = [];


// BETTER DOCTOR VARIABLES -----------------------------------------------------------------------------------------------------------------------
const doctors_api_key = '2a424d77579d56c5cb91ae9794c57995';
var searchField = 'doctors'; // create dropdown list with these options
var betterDoctorsUrl = `https://api.betterdoctor.com/2016-03-01/${searchField}?location=37.773,-122.413,100&skip=2&limit=10&user_key=` + doctors_api_key;
var doctorsConditions = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + doctors_api_key;
// -------------------------------------------------------------------------------------------------------------------------------------------------


// GOOGLE MAPS VARIABLES ---------------------------------------------------------------------------------------------------------------------------
const google_maps_api = 'AIzaSyDsCDKZW5hk6Bn6bxiIKnBMUMUB82TAlaM'; // need to have account upgraded for billing in order for this feature to work
var googleMapsUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=37.773%2c%20-122.413&zoom=12&size=400x400&key=' + google_maps_api
// -------------------------------------------------------------------------------------------------------------------------------------------------

// FUNCTION gets all symptoms in the BetterDoctor API
$.ajax({
    method: "GET",
    url: doctorsConditions
}).then(function(response){
    
    data = response.data
    
    for (let i=0; i < data.length; i++)
    {
        medicalConditions.push(data[i].name)
    }
});


function autocomplete(inp, arr)
{
    var currentFocus;
    
    inp.addEventListener('input', function(e)
    {
        console.log(this.value);
        var a, b, i, val = this.value()
        
    })
}



$('#btn-search').on('click', function()
{
    var dropDownSelection = $('#better-doctor-values').val();
    betterDoctorsSearch(dropDownSelection);
});



var googleMap = $('<img>');
googleMap.attr('src', googleMapsUrl);

$('.map').append(googleMap);

// 1. Use doctors api to be able to show on the html page
// 2. find out how to extract the 
// response.data[0].practices[0].lat
// response.data[0].practices[0].lon

// 37.773,-122.413

// Run ajax request for doctors before running the one for google maps
// $.ajax({
// method: "GET",
// url: betterDoctorsUrl
// }).then(function(response)
// {
// // console.log(response);
// // Capture the latitude through the doctors api
//     var latitude = response.data[0].practices[0].lat;
// // console.log(response.data[0].practices[0].lat);

// // Capture the longitude the doctors api
//     var longitude = response.data[0].practices[0].lon;
// // console.log(response.data[0].practices[0].lon);
// });

function betterDoctorsSearch(category)
{
    if (category === 'doctors')
    {
        console.log('Doctors');
    }
    else if (category === 'conditions')
    {
        console.log('Conditions');
    }
    else 
    {
        console.log('Insurance');
    }

    // var doctorsConditions = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + doctors_api_key;
    
    // $.ajax({
    //     method: "GET",
    //     url: doctorsConditions
    // }).then(function(response){
        
    //     data = response.data
        
    //     for (let i=0; i < data.length; i++)
    //     {
    //         console.log(data[i].name);
    //     }
    // });
}



// Return a map using the doctors address. Look for pharmacies in the area and plan a route.