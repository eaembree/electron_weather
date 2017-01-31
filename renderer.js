const readline = require('readline');
const fs = require('fs');

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var APPID = '78be9c2134128e5ce421a501669830f1'

var IowaCityId = 4862034;

var $ = jquery = require("jquery")

$('h1').html('Hello from jQuery!')

/*
$.ajax({
    type: 'GET',
    crossDomain: true,
    url: "https://webapps1.healthcare.uiowa.edu/HPINV",
    success: function(data, textStatus, jqXHR){
        console.log('success');
        console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown){
        console.log('error');
    },
    complete: function(jqXHR, textStatus){
        console.log('complete');
    }
});
*/


const rl = readline.createInterface({
    input: fs.createReadStream('mycities.json')
});

let cityArr = [];

rl.on('line', function(line) {
    console.log(JSON.parse(line));
});



//console.log(process.env);

/*
$.ajax({
    type: 'GET',
    crossDomain: true,
    url: "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=" + APPID,
    success: function(data, textStatus, jqXHR){
        console.log('success method');
        console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown){
        console.log('error method');
        console.log(jqXHR.responseJSON);
        console.log(textStatus);
        console.log(errorThrown);
    },
    complete: function(jqXHR, textStatus){
        console.log('complete method');
    }
});
*/
$.ajax({
    type: 'GET',
    crossDomain: true,
    url: "http://api.openweathermap.org/data/2.5/weather?id=" + IowaCityId + "&units=imperial" + "&APPID=" + APPID,
    success: function(data, textStatus, jqXHR){
        console.log('success method');
        console.log(data);

        $('#name').html(data.name);
        $('#lat').html(data.coord.lat);
        $('#lon').html(data.coord.lon);

        $('#id').html(data.weather[0].id);
        $('#main').html(data.weather[0].main);
        $('#description').html(data.weather[0].description);
        $('#icon').html(data.weather[0].icon);

        $('#pressure').html(data.main.pressure);
        $('#humidity').html(data.main.humidity);
        $('#temp').html(data.main.temp);
        $('#temp_min').html(data.main.temp_min);
        $('#temp_max').html(data.main.temp_max);
    },
    error: function(jqXHR, textStatus, errorThrown){
        console.log('error method');
        console.log(jqXHR.responseJSON);
        console.log(textStatus);
        console.log(errorThrown);
    },
    complete: function(jqXHR, textStatus){
        console.log('complete method');
    }
});
