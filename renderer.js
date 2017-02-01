var $ = jquery = require("jquery")
const readline = require('readline');
const fs = require('fs');

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ICON_LIST = [
    {d: '01d.png', n: '01n.png', desc: 'clear sky'},
    {d: '02d.png', n: '02n.png', desc: 'few clouds'},
    {d: '03d.png', n: '03n.png', desc: 'scattered clouds'},
    {d: '04d.png', n: '04n.png', desc: 'broken clouds'},
    {d: '09d.png', n: '09n.png', desc: 'shower rain'},
    {d: '10d.png', n: '10n.png', desc: 'rain'},
    {d: '11d.png', n: '11n.png', desc: 'thunderstorm'},
    {d: '13d.png', n: '13n.png', desc: 'snow'},
    {d: '50d.png', n: '50n.png', desc: 'mist'}
];
const I_01 = ICON_LIST[0];
const I_02 = ICON_LIST[1];
const I_03 = ICON_LIST[2];
const I_04 = ICON_LIST[3];
const I_09 = ICON_LIST[4];
const I_10 = ICON_LIST[5];
const I_11 = ICON_LIST[6];
const I_13 = ICON_LIST[7];
const I_50 = ICON_LIST[8];

function getIcon(id){
    switch(id){
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            return I_11.d;

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return I_09.d;

        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            return I_10.d;

        case 511:
            return I_13.d;

        case 520:
        case 521:
        case 522:
        case 531:
            return I_09.d;

        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            return I_13.d;
        
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            return I_50.d;

        case 800:
            return I_01.d;

        case 801:
            return I_02.d;
            
        case 802:
            return I_03.d;

        case 803:
        case 804:
            return I_04.d;

        default:
            return '';
    }
}

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


$(document).ready(function () {
    $('#get-data-button').click(function () {
        getCityData($('#cityId').val());
    });
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

            let i = getIcon(data.weather[0].id);
            i = i === '' ? '' : 'icons/' + i;
            $("#curr-icon").attr('src', i);

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
