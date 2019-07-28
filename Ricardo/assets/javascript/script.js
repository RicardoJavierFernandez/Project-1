// BETTER DOCTOR API VARIABLES -----------------------------------------------------------------------------------------------------------------------
const doctors_api_key = '2a424d77579d56c5cb91ae9794c57995';
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
    
    var data = response.data
    
    for (let i=0; i < data.length; i++)
    {
        medicalConditions.push(data[i].name)
    }

    // Create drop down list of medical conditions returned by the BetterDoctor api
    for (condition of medicalConditions.sort())
    {
        
        $('.conditions').append('<option value=' + String(condition) + '>' + String(condition) + '</options>')
    }
});


function searchLocation(city, state)
{
    return (state.toLowerCase() + '-' + city.toLowerCase());
}

// EVENT on the dropdown list 
// $('#better-doctor-values').on('change', function()
// {
//     $('#input-search').attr('placeholder', 'Search ' + toTitleCase($(this).val()));
// });


$('#btn-search').on('click', function()
{
    
    var dropDownSelection = $('#better-doctor-values').val();
    var searchParameter = $('.conditions').val();
    var cityName = $('#location-search').val();
    var stateSelection = $('.states').val();

    if (cityName.length > 0 & searchParameter.length > 0)
    {
        betterDoctorsSearch(dropDownSelection, searchLocation(cityName, stateSelection));
    }
    else
    {
        alert("Please type in a word in the search box and city location");
    }
    
});


function betterDoctorsSearch(category, userLocation)
{
    var locationSearch = userLocation //format is state abbreviation - city (i.e. fl-miami, ca-san francisco)
    var searchField;
    doctorLocations = [];
    if (category === 'doctors')
    {
        searchField = 'doctors';
        searchUrl = `https://api.betterdoctor.com/2016-03-01/doctors?location=${locationSearch}&skip=0&limit=10&user_key=${doctors_api_key}`;
    }
    else if (category === 'conditions')
    {
        searchField = 'conditions';
        searchUrl = doctorsConditions;
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
        
        // console.log(response.data);
        var doctorsName;
        var doctorsLatitude;
        var doctorsLongitude
        var data = response.data
        console.log(data);
        for (let i = 0; i < data.length; i++)
        {
            doctorsName = data[i].profile.first_name + ' ' + data[i].profile.last_name + ', ' + data[i].profile.title;
            for (let a = 0; a < data[a].practices.length; a++)
            {
                doctorsLatitude = data[a].practices[a].lat;
                doctorsLongitude = data[a].practices[a].lon;
    
                displayMap(doctorsLatitude, doctorsLongitude, i);
                console.log(i, doctorsName, doctorsLatitude, doctorsLongitude);
            }
        }
    });
}


function displayMap(latitude ,longitude, mapId)
{
    var googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&markers=color:red%7Clabel:${mapId}%7C${latitude},${longitude}&zoom=12&size=400x400&key=` + google_maps_api
    var googleMap = $('<img>').attr('src', googleMapsUrl);
    $('.map').append(googleMap);
};


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
