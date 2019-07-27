user_key = '2a424d77579d56c5cb91ae9794c57995';


// This code depends on jQuery Core and Handlebars.js 
// https://developer.betterdoctor.com/code-samples

var api_key = 'CODE_SAMPLES_KEY_9d3608187'; // Get your API key at developer.betterdoctor.com
var searchField = 'doctors'; // create dropdown list with these options
var location = 'need to find how to get users location';

var resource_url = `https://api.betterdoctor.com/2016-03-01/${searchField}?location=37.773,-122.413,100&skip=2&limit=10&user_key=` + api_key;


$.ajax({
    method: "GET",
    url: resource_url
}).then(function(response)
{
    console.log(response);
})

