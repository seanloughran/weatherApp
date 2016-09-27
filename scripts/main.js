//AIzaSyCzgzYNnZAyw6TSIZJ46HHtjzr8puUwOpQ

$(document).ready(function() {

  var dots = 0;

  setInterval(function() {
    if (dots < 3) {
      $("#dots").append(".");
      dots++;
    } else {
      $("#dots").html("");
      dots = 0;
    }
  }, 1000);

  var far = "";
  var cel = "";

  // Functionality for fahrenheit/celsius button
  $("#switch").on("click", function() {
    var type = $("#temp").attr("data-temp");
    var tem = parseInt($("#temp").html());

    if (type == "f") {
      if (cel == "") {
        cel = ((tem - 32) * .5556).toFixed(1);
        $("#temp").html(cel);
      } else {
        $("#temp").html(cel);
      }

      $("#temp").attr("data-temp", "c");
      $("#switch").html("Fahrenheit");

    } else {
      $("#temp").html(far);
      $("#temp").attr("data-temp", "f");
      $("#switch").html("Celsius");
    }
  });

  if (navigator.geolocation) { //checks if browser supports geolocation
    navigator.geolocation.getCurrentPosition(showLocation);

    function showLocation(position) { // position fed from "getCurrentPosition"
      console.log(position);
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var latlng = {lat: lat, lng: long}; // Featured in reverse geocode request
      var forecastKEY = "679039406e42fb183bd1bdf8f3155b71"; // Key for forecast API.
      var url = "https://api.forecast.io/forecast/";

      // Start of reverse geo request for address.
      $.ajax({
        url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCzgzYNnZAyw6TSIZJ46HHtjzr8puUwOpQ",
        type: "GET",
        dataType: 'jsonp', // jsonp used for crossorigin request
        success: function(data) {
          var geocoder = new google.maps.Geocoder;
          geocoder.geocode({location: latlng}, function(results, status) {
            if (status === 'OK') {
              var place = results[3].formatted_address; // Ex. Portland, OR, USA
              $("#place").html(place);
            }
          });

        }
      });

      // End of reverse geo request for address.


      // Start of request for weather forecast call.
      $.ajax({
        url: url + forecastKEY + "/" + lat + "," + long, // Calls for forecast of specific location.
        method: 'GET',
        dataType: 'jsonp',
        success: function(response) {
          // console.log(response);
          var temp = response.currently.apparentTemperature.toFixed(1);
          far = response.currently.apparentTemperature.toFixed(1); // Involved in fahrenheit/celsius switch.
          // console.log(far);

          $("#temp").html(temp); // Puts temp onto page.

          var icon = response.currently.icon; // Icon for description of the current weather.

          // Assigns background image in accordance with "icon"
          switch (icon) {
            case "clear-night":
              $("#outside-main").css("background-image", 'url("images/nightsky.jpg")');
              break;
            case "rain":
              $("#outside-main").css("background-image", 'url("images/rain.jpg")');
              break;
            case "snow":
              $("#outside-main").css("background-image", 'url("images/snow.jpg")');
              break;
            case "sleet":
              $("#outside-main").css("background-image", 'url("images/sleet.jpg")');
              break;
            case "wind":
              $("#outside-main").css("background-image", 'url("images/wind.jpg")');
              break;
            case "fog":
              $("#outside-main").css("background-image", 'url("images/fog.jpg")');
              break;
            case "cloudy":
              $("#outside-main").css("background-image", 'url("images/clouds.jpg")');
              break;
            case "partly-cloudy-day":
               $("#outside-main").css("background-image", 'url("images/partlycloudy.jpg")');
              break;
            default:
              $("#outside-main").css("background-image", 'url("images/clearday.jpg")');
          }

          $("#blackBox").css("display", "none"); // Removes "loading" black after all information has been loaded.
        }

      });

      // End of request for weather forecast.


    }
    // End of showLocation

  } else {
    // Runs if geolocation not supported
    $("#place").html("Looks like your browser doesn't support geolocation");
  }
  // End of if (navigator.geolocation)

});
