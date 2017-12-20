console.log('server is ready!');
//var jsonfile = require('jsonfile');
/*var file = 'http://api.open-notify.org/iss-now.json';
http.get(file, function(obj){
  var body = '';
  obj.on('data', function (chunk) {
  	body += chunk;
  });
  obj.on('end', function(){
    var massage = JSON.parse(body);
    console.dir(massage);
  });
}).on('error', function(e){
      console.log("Got an error: ", e);
});*/
var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);


//npm install XMLHttpRequest --save
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//AJAX,原生JS引入JSON(p5.js loadJSON不可用)
var requestURL = 'http://api.open-notify.org/iss-now.json';
var myVar = setInterval(newLocation, 1000*20);
function newLocation(){
var request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.onreadystatechange = function (oEvent) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      console.log(request.responseText);
      var issData = JSON.parse(request.responseText);
      //var msg = JSON.stringify(issData.message);
      //console.log(msg);
      tweetIt(issData);
    } else {
      console.log("Error", request.statusText);
    }
  }
};
request.send(null);

function tweetIt(location){
  //var msg = JSON.stringify(location.message);
  //console.log(msg);
  var lat = JSON.stringify(location.iss_position.latitude);
  var long = JSON.stringify(location.iss_position.longitude);
  var tweet = {
  	status: 'The current location of the spaceship is: Latitude ' + lat + ' and Longitude ' + long + '.'
    //status: msg
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if(err){
  	  console.log("Wrong Alert!");
    }else{
  	  console.log("It worked!");
    }
  }
}
}






