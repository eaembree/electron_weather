// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var APPID = '78be9c2134128e5ce421a501669830f1'

var $ = jquery = require("jquery")

console.log($);

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
