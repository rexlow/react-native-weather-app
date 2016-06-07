var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=51a688acd3a84598199d3e6c41fe8c17';
var _ = require('lodash');

var kelvinToF = function(kelvin){
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' *F' //returns a string
};

var kelvinToC = function(kelvin){
  return Math.round((kelvin - 273.15)) + ' *C' //returns a string
};

module.exports = function(latitude, longitude){
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`; //ES6 template string
  //same as rootUrl + '&lat=' + latitude + '&lon' + longitude
  
  return fetch(url) //fetch takes a single url and return a promise
    .then(function(response){
      return response.json() //json parsing method, returns a promise
    })
    .then(function(json){
      return{
        city: _.capitalize(json.name),
        temperature: kelvinToC(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
  });
}