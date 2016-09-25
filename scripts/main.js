//AIzaSyCzgzYNnZAyw6TSIZJ46HHtjzr8puUwOpQ

$(document).ready(function() {

  var far = "";
  var cel = "";
  console.log(far);

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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation);

    function showLocation(position) {
      console.log(position);
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var latlng = {lat: lat, lng: long};
      var forecastKEY = "679039406e42fb183bd1bdf8f3155b71";
      var url = "https://api.forecast.io/forecast/";

      // Start of reverse geo request for address.
      $.ajax({
        url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCzgzYNnZAyw6TSIZJ46HHtjzr8puUwOpQ",
        type: "GET",
        dataType: 'jsonp',
        success: function(data) {
          var geocoder = new google.maps.Geocoder;
          geocoder.geocode({location: latlng}, function(results, status) {
            if (status === 'OK') {
              var place = results[3].formatted_address;
              $("#place").html(place);
            }
          });

        }
      });

      // End of reverse geo request for address.


      // Start of request for weather forecast.
      $.ajax({
        url: url + forecastKEY + "/" + lat + "," + long,
        method: 'GET',
        dataType: 'jsonp',
        success: function(response) {
          // console.log(response);
          var temp = response.currently.apparentTemperature.toFixed(1);
          far = response.currently.apparentTemperature.toFixed(1);
          // console.log(far);

          $("#temp").html(temp);

          var icon = response.currently.icon;

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

          $("#blackBox").css("display", "none");
        }

      });

      // End of request for weather forecast.


    }
    // End of if navigator.geolocation

  } else {
    $("#testP").html("Looks like your browser doesn't support geolocation");
  }

});
