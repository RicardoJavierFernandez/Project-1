// BETTER DOCTOR API VARIABLES ---------------------------------------------------------------------------------------------------------------------
const doctors_api_key = '2a424d77579d56c5cb91ae9794c57995';
var doctorsConditions = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + doctors_api_key;
// -------------------------------------------------------------------------------------------------------------------------------------------------


// GOOGLE MAPS VARIABLES ---------------------------------------------------------------------------------------------------------------------------
const google_maps_api = 'AIzaSyDsCDKZW5hk6Bn6bxiIKnBMUMUB82TAlaM'; // api key is restricted for use by certain ip addresses only. 
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
    $('.states').append('<option value=' + String(state) + '>' + String(state) + '</options>');
}


// FUNCTION gets all conditions in the BetterDoctor API and creates a drop down list of the conditions
$.ajax({
    method: "GET",
    url: doctorsConditions
}).then(function(response){
    
    var data = response.data;
    
    // Add elements to the medicalConditions array
    for (let i = 0; i < data.length; i++)
    {
        medicalConditions.push(data[i].name);
    }

    // Create drop down list of medical conditions returned by the BetterDoctor api
    for (condition of medicalConditions.sort())
    {
        $('.conditions').append('<option value=' + String(condition) + '>' + String(condition) + '</options>');
    }
});


function displayMap(name, latitude, longitude, mapId)
{
    var googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&markers=color:red%7Clabel:${mapId}%7C${latitude},${longitude}&zoom=12&size=400x400&key=${google_maps_api}`;
    var googleMap = $('<span>').text(name);
    googleMap.append($('<img>').attr('src', googleMapsUrl));
    $('.map').append(googleMap);
};

"40.1222, 70.8885"

function toTitleCase(word)
{
    var wordArray = word.toLowerCase().split(' ');
    for (let i = 0; i < wordArray.length; i++)
    {
        wordArray[i] = wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1);
    }
    return wordArray.join(' ')
}


function searchLocation(city, state)
{
    return (state.toLowerCase() + '-' + city.toLowerCase().replace(' ', '-')); // Use replace method to make sure the city string passed to the better doctor api is in the correct format with no spaces
}


$('#btn-search').on('click', function()
{    
    var selectedCondition = $('.conditions').val(); // drop down list value
    var cityName = $('#location-search').val(); // user input for city name. need to update to adjust for mispelling. may need to use googles maps auto-fill feature
    var stateSelection = $('.states').val(); // drop down list value

    if (cityName.length > 0)
    {
        betterDoctorsSearch(selectedCondition, searchLocation(cityName, stateSelection));
    }
    else
    {
        alert("Please type in a city location");
    }
    
});


function betterDoctorsSearch(medicalCondition, userLocation)
{
    var locationSearch = userLocation; //format is "state abbreviation-city" (i.e. fl-miami, ca-san-francisco, ny-new-york)
    var searchUrl = `https://api.betterdoctor.com/2016-03-01/doctors?query=${medicalCondition}&location=${locationSearch}&skip=0&limit=10&user_key=${doctors_api_key}`;
  
    $.ajax({
        method: "GET",
        url: searchUrl
    }).then(function(response){
        
        var doctorsName;
        var doctorsLatitude;
        var doctorsLongitude
        var data = response.data
        // console.log(data);

        var count = 0;
        // Loop through each doctor in the response data
        for (var i = 0; i < data.length; i++)
        {
            doctorsName = data[i].profile.first_name + ' ' + data[i].profile.last_name + ', ' + data[i].profile.title;
            
            // Loop through the array of practices each doctor has
            for (var a = 0; a < data[i].practices.length; a++)
            {
                doctorsLatitude = data[i].practices[a].lat;
                doctorsLongitude = data[i].practices[a].lon;
                displayMap(doctorsName, doctorsLatitude, doctorsLongitude, count+1);

                count++;
                // console.log(i, doctorsName, doctorsLatitude, doctorsLongitude);
            }
        }
        $('#number-results').text(count + ' matches')
    });
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
