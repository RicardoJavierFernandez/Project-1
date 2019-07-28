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

var medicalConditions = [];
var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
            'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
            'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
            'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
            'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

// Create a dropdown list with all the state abbreviations
for (state of states)
{
    $('.states').append('<option value=' + String(state) + '>' + String(state) + '</options>')
}


// FUNCTION gets all conditions in the BetterDoctor API
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


function searchLocation(city, state)
{
    
    console.log(state.toLowerCase() + '-' + city.toLowerCase())
}

// EVENT on the dropdown list 
$('#better-doctor-values').on('change', function(e)
{
    $('#input-search').attr('placeholder', 'Search ' + toTitleCase($(this).val()));
});



$('#btn-search').on('click', function()
{
    
    var dropDownSelection = $('#better-doctor-values').val();
    var citySelection = $('#location-search').val();
    var stateSelection = $('.states').val();

    searchLocation(citySelection, stateSelection);
    // console.log(stateSelection.toLowerCase() + '-' + citySelection.toLowerCase());
    // change the placeholder value depending on the dropdown list item selected 
    
    // betterDoctorsSearch(dropDownSelection, locationSearch);

    // searchLocation()
});



// var googleMap = $('<img>');
// googleMap.attr('src', googleMapsUrl);

// $('.map').append(googleMap);

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

function betterDoctorsSearch(category, userLocation)
{
    var locationSearch = userLocation
    var searchField;
    if (category === 'doctors')
    {
        searchField = 'doctors';
        searchUrl = `https://api.betterdoctor.com/2016-03-01/doctors?location=${locationSearch},100&skip=2&limit=10&user_key=` + doctors_api_key;
    }
    else if (category === 'conditions')
    {
        searchField = 'conditions';
        searchUrl = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + doctors_api_key;
    }
    else 
    {
        searchField = 'insurance'
        searchUrl = 'https://api.betterdoctor.com/2016-03-01/insurances?skip=0&limit=10&user_key=' + doctors_api_key;
    }
  
    $.ajax({
        method: "GET",
        url: searchUrl
    }).then(function(response){
        
        console.log(response.data);
        // data = response.data
        
        // for (let i=0; i < data.length; i++)
        // {
        //     console.log(data[i].name);
        // }
    });
}


function toTitleCase(word)
{
    var wordArray = word.toLowerCase().split(' ');
    for (let i = 0; i < wordArray.length; i++)
    {
        wordArray[i] = wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1);
    }
    return wordArray.join(' ')
}


// function autocomplete(inp, arr)
// {
//     var currentFocus;
    
//     inp.addEventListener('input', function(e)
//     {
        
//         var a, b, i, val = this.value;
//         closeAllLists();
//         if (!val)
//         {
//             return false;
//         }
//         currentFocus = -1;

//         a = document.createElement('div');
//         a.setAttribute('id', this.id + 'autocomplete-items');
//         a.setAttribute('class', 'autocomplete-items');

//         this.parentNode.appendChild(a);

//         for (let i = 0; i < arr.length; i++)
//         {
//             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase())
//             {
//                 b = document.createElement('div');
//                 b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
//                 b.innerHTML += arr[i].substr(val.length);
//                 b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
//                     b.addEventListener('click', function(e)
//                     {
//                         inp.value = this.getElementsByTagName('input')[0].value;
//                         closeAllLists();
//                     });
//                     a.appendChild(b);
//             }
//         }
//     });

//     inp.addEventListener('keydown', function(e)
//     {
//         var x = document.getElementById(this.id + 'autocomplete-list');
//     })
// }

// autocomplete(document.getElementById('input-search'), medicalConditions);



// Return a map using the doctors address. Look for pharmacies in the area and plan a route.
