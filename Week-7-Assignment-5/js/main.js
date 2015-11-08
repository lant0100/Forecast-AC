//MyWidget Script
/**************************
Add a link for a CSS file that styles .mywidget
Add a script tag that points to CDN version of jQuery 1.*
Add a script tag that loads your script file from http://m.edumedia.ca/
**************************/
var scriptsLoaded = 0;
var i;


document.addEventListener("DOMContentLoaded", init);

function init() {
  
  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "css/weather-icons.css"); 
  //loads the CSS file and applies it to the page
  css.addEventListener("load", loadCount);
  document.querySelector("head").appendChild(css);

  var jq = document.createElement("script");
  jq.addEventListener("load", loadCount);
  jq.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  document.querySelector("head").appendChild(jq);
}

function buildWidget(cls){
  console.log("Using div with class", cls);
  $.get("https://api.forecast.io/forecast/61f78a5bbe07b2a3a13ea742bbce77bd/45.3470,-75.7594?units=ca&exclude=daily,flags,minutely,currently",
   onData,
   "jsonP"
  );
  //now do the ajax call then build your page
  function onData(data){
  console.log("data div" + cls);
  console.log(data);

  $table = $('<table></table>');
  $('.weather-forecast').append($table);
 
  var x = new Date(data.hourly.data[0].time * 1000);
  var hours = x.getHours();
  var hum = Math.floor(data.hourly.data[0].humidity * 100);
  var cloud = Math.floor(data.hourly.data[0].cloudCover *100);
  var temp = Math.floor(data.hourly.data[0].temperature);
  var wind = Math.floor(data.hourly.data[0].windSpeed);
  var icon = iconMapping(data.hourly.data[0].icon);
  var sum = data.hourly.data[0].summary;

  $('.weather-forecast').prepend('<div class= top></div>');
  $('.top').append('<h2>' + wind + "km/h " + hum + "% " + cloud + "%" + '</h2>');
  $('.top').prepend('<h1>' + temp + "&degC" + '</h1>');
  $('.top').prepend('<h2>' + hours + ":00" + '</h2>');
  $('.top').prepend('<p>Todays Weather Conditions!</p>');
  $('.top').css('text-align', 'center').css('font-size', '2rem').css('border', '1px solid coral').css('border-radius', '20%').css('background-color', 'coral').css('margin', '0 auto');
  $('h2').css('padding-bottom', '3rem');
  $('p').css('font-size', '4rem');

  $('table').append('<tr></tr>');
  $('tr').addClass('head');
  $('.head').append('<th>' + "Hour" + '</th>' + '<th>' + "Humidity" + '</th>' + '<th>' + "Cloud" + '</th>' + '<th>' + "Temp" + '</th>' + '<th>' + "Wind" + '</th>' + '<th>' + "Icon" + '</th>' + '<th>' + "Summary" + '</th>');

  for (i = hours; i < 24; i++) {
  $('table').append('<tr class = "weather"></tr>');
    if (i === 23) {
      break;
   }

  }

  
  var hours2 = hours;

  $('.weather').each(function() {

  hours2++;

  var hum2 = Math.floor(data.hourly.data[hours2].humidity * 100);
  var cloud2 = Math.floor(data.hourly.data[hours2].cloudCover *100);
  var temp2 = Math.floor(data.hourly.data[hours2].temperature);
  var wind2 = Math.floor(data.hourly.data[hours2].windSpeed);
  var icon2 = iconMapping(data.hourly.data[hours2].icon);
  var sum2 = data.hourly.data[hours2].summary;

  var weatherWiz = '<td>' + hours2 + ":00" + '</td><td>' + hum2 + "%" + '</td><td>' + cloud2 + "%" + '</td><td>' + temp2 + "&degC" + '</td><td>' + wind2 + "km/h" + '</td><td><i class="wi '+icon2+'"></i></td><td>' + sum2 + '</td>';
  $(this).append(weatherWiz);
  });

function iconMapping (icon) {
  var iconMap = {
  "clear-day": "wi-forecast-io-clear-day",
  "clear-night": "wi-forecast-io-clear-night",
  "wind": "wi-forecast-io-wind",
  "partly-cloudy-day": "wi-forecast-io-partly-cloudy-day",
  "rain": "wi-forecast-io-rain",
  "snow": "wi-forecast-io-snow",
  "sleet": "wi-forecast-io-sleet",
  "fog": "wi-forecast-io-fog",
  "cloudy": "wi-forecast-io-cloudy",
  "partly-cloudy-night": "wi-forecast-io-partly-cloudy-night",
  "hail": "wi-forecast-hail",
  "thunderstorm": "wi-forecast-io-thunderstorm",
  "tornado": "wi-forecast-io-tornado"
  }
  return iconMap[icon];
  }

  $('tr:nth-child(odd)').css('background-color', 'coral');
  $('table').css('margin-right', 'auto').css('margin-left', 'auto').css('text-align', 'center').css('font-size', '3rem');
  $('h1').css('text-align', 'center').css('padding-bottom', '50px');
  $('th').css('text-align', 'center').css('padding', '5px 15px 5px 15px');
  $('td').css('padding', '5px 15px 5px 15px');

} 
}

function loadCount(){
  scriptsLoaded++;
    if(scriptsLoaded === 2){
      //call the function in My widget script to load the JSON and build the widget
      buildWidget(".weather-forecast");
      console.log("both scripts loaded");
    }
}