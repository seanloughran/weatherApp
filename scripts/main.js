$(document).ready(function() {

  // if (navigator.geolocation) {
  //   console.log("geolocate");
  //   navigator.geolocation.getCurrentPosition(showLocation);
  //
  //   function showLocation(position) {
  //     var lat = 45.5;
  //     var long = -122.6;
  //     var KEY = "679039406e42fb183bd1bdf8f3155b71";
  //     var url = "https://api.forecast.io/forecast/";
  //
  //     $.getJSON(url + KEY + "/" + lat + "," + long, function(json) {
  //       console.log(json);
  //     });
  //   }
  //
  // } else {
  //   $("#testP").html("Looks like your browser doesn't support geolocation");
  // }

  function showLocation() {
    var lat = 45.5;
    var long = -122.6;
    var KEY = "679039406e42fb183bd1bdf8f3155b71";
    var url = "https://api.forecast.io/forecast/";

    $.getJSON(url + KEY + "/" + lat + "," + long, function(json) {
      console.log(json);
    });
  }

  showLocation();

});
