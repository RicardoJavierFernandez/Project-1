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

var stateNames = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
                'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
                'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
                'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 
                'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 
                'Washington', 'West', 'Virginia', 'Wisconsin', 'Wyoming']

var betterDoctorUnique = [];

// Create a dropdown list with all the state abbreviations
for (var i = 0; i < stateNames.length; i++)
{
    $('.states').append('<option value=' + String(states[i]) + '>' + String(stateNames[i]) + '</options>');
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


function displayMap(name, specialty, description, rating, latitude, longitude, mapId)
{
    var googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&markers=color:red%7Clabel:${mapId}%7C${latitude},${longitude}&zoom=12&size=400x400&key=${google_maps_api}`;
    // var googleMap = $('<span>').html('<a href="" class="doctor-profile">' + name + '     Rating: ' + rating + ' / 5</a>') 
    var googleMap = $('<span>').html(`<a class="doctor-profile" data-name="${name}" data-specialty="${specialty}" data-description="${description}">${name} Rating: ${rating} / 5</a>`) 
    googleMap.append($('<img>').attr('src', googleMapsUrl));
    $('.map').append(googleMap);

};

$('body').on('click','.doctor-profile', function(e){
    e.preventDefault();
    let name = $(this).attr('data-name');
    let specialty = $(this).attr('data-specialty');
    let description = $(this).attr('data-description')
    
    console.log($(this).next());
    console.log(name, specialty, description);

});


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
    betterDoctorUnique = []; // Array that stores the UIDs of the doctors. Used to filter out duplicate doctors showing up.
    if ($('.map').length){
        $('.map').empty(); // Empty the content of the map div to display the new search results
    }
    var selectedCondition = $('.conditions').val(); // drop down list value
    var cityName = $('#location-search').val(); // user input for city name. need to update to adjust for mispelling. may need to use googles maps auto-fill feature
    var stateSelection = $('.states').val(); // drop down list value

    if (cityName.length > 0)
    {
        $('#number-results').empty(); // 
        betterDoctorsSearch(selectedCondition, searchLocation(cityName, stateSelection));
    }
    else
    {
        $('#number-results').text('Please enter a city before submitting.');
        // alert("Please type in a city location");
    }
    
});


function checkDuplicateLocation(doctorUniqueID)
{
    let doctorUnique = String(doctorUniqueID); // make sure to pass in the doctor's unique ID

    if (betterDoctorUnique.includes(doctorUniqueID))
    {
        return false;
    }
    else
    {
        betterDoctorUnique.push(doctorUnique);
        return true;
    }
}


function betterDoctorsSearch(medicalCondition, userLocation)
{
    var locationSearch = userLocation; //format is "state abbreviation-city" (i.e. fl-miami, ca-san-francisco, ny-new-york)
    var searchUrl = `https://api.betterdoctor.com/2016-03-01/doctors?query=${medicalCondition}&location=${locationSearch}&skip=0&limit=10&user_key=${doctors_api_key}`;
  
    $.ajax({
        method: "GET",
        url: searchUrl
    }).then(function(response){
        
        var data = response.data;
        var doctorID; // add the doctors unique ID
        var doctorsName;
        var doctorsLatitude;
        var doctorsLongitude;
        var doctorInsurance = [];
        var doctorRatings = {};
        console.log(response);
        var count = 0; // Count variable used to display the number of matches

        // Loop through each doctor in the response data
        for (var i = 0; i < data.length; i++)
        {
            doctorsName = data[i].profile.first_name + ' ' + data[i].profile.last_name + ', ' + data[i].profile.title;
            doctorID = data[i].uid;
            let ratingsData = data[i].ratings
            let doctorSpecialty = data[i].specialties[0].actor;
            let specialtyDescription = data[i].specialties[0].description;

            for (var b = 0; b < ratingsData.length; b++)
            {
                if (ratingsData[b].rating == null)
                {
                    continue;
                }
                else
                {
                    doctorRatings[doctorID] = ratingsData[b].rating;
                    // console.log(doctorsName, ratingsData[b].rating);
                    for (let a = 0; a < data[i].insurances.length; a++)
                    {
                        doctorInsurance.push(data[i].insurances[a].insurance_plan.name);
                    }

                    // Loop through the array of practices each doctor has
                    for (let a = 0; a < data[i].practices.length; a++)
                    {
                        doctorsLatitude = data[i].practices[a].lat;
                        doctorsLongitude = data[i].practices[a].lon;
                        if (checkDuplicateLocation(doctorID))
                        {
                            displayMap(doctorsName, doctorSpecialty, specialtyDescription, doctorRatings[doctorID], doctorsLatitude, doctorsLongitude, count+1);
                            count++;
                        }
                    }
                }
            }
        }

        // Logic to determine how to display the number of matched items
        if (count == 0)
        {
            $('.map').append('<h1>No matches, please try a different search.</h1>')
        }

        else if (count === 1)
        {
            $('#number-results').text(count + ' match')
        }
        else {
            $('#number-results').text(count + ' matches')
        }
    });
}
