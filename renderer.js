var $ = jquery = require("jquery")
const readline = require('readline');
const fs = require('fs');

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var APPID = '78be9c2134128e5ce421a501669830f1'

// Read cities from file and populate drop down.
let cityArr = [];

let rl = readline.createInterface({
    input: fs.createReadStream('mycities.json')
});

rl.on('line', function (line) {
    cityArr.push(JSON.parse(line));
});

rl.on('close', () => {
    let newHtml = '';
    cityArr.forEach((city) => {
        newHtml += `<option value=${city._id}>${city.name}</option>`
    })
    $('#cityId').html(newHtml);
    cityArr = null;
    rl = null;
});


$('#get-data-button').click(function () {
    getCityData($('#cityId').val());
});


function getCityData(cityId) {
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=imperial" + "&APPID=" + APPID,
        success: function (data, textStatus, jqXHR) {
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

            $('#weather-content').show();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('AJAX ERROR');
            console.log(jqXHR.responseJSON);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function (jqXHR, textStatus) {
        }
    });
}
