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
      //var forecastKEY = "";
      var url = "https://api.forecast.io/forecast/";

      // Start of reverse geo request for address.
      $.ajax({
        url: "https://maps.googleapis.com/maps/api/js?key=" + googleKEY,
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
              $("#outside-main").css("background-image", 'url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0MDAwNDA8NDQ0NDQ0MDAwMDQ8MDAwMFBEWFhQRFBQYHDQgGBolHBQUITEtJSsrLjAuFx8zODM4NygtLisBCgoKDg0MFA8PFCwcFBwsLCwsLCwsLCwsLCw3LCwsLCwsLCwrLSwsLCw3LDcsLCwsKywsKyssLCwrKywsKywsK//AABEIAKgBLAMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAQIDBAYHBf/EADoQAAEEAgECAgcFBAsAAAAAAAABAhESAxMEBiExgQVBUWFxkaEHIiMyQlJysfEUFkNTYpKTorLR0v/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAIxEBAAICAgEEAwEAAAAAAAAAABESAQMCE2EhMVFSI0KRMv/aAAwDAQACEQMRAD8A+HgAzrCEAwKAAGUIBhAQgKgIAQFQEATA4GACgIKgAJGOAgoQDgIAQDgIAQDgIAQDgIAQoKCCCYCChATAFABIFQKAJAqAgCQHAEUgHA4KhAUACgIGMBAOAKEMcBACgCoCAEEFQEATA4KgIBKYCCggCYCCoCAJgILgUBEwEFQEAlMBBUBAEwKC4CASgILgQWUBBcCgCYAqAgggIKgAJCBgAhwA4AQQXAQUTA4KgICJgcFBACgIKgIKJgILgIAmAguAgQiYCCoHBYVEDgqAgQJgIKgIEImAgqAgQJgIKgIECYFBcBAgRAQXAoJAiAguAgKiAguBQERAQXAoIqYFBcCgCYFBcCAUDgaIOAJgcFQOCiYCCoHARMDgqAgomBwVA4AiBwVA4KIgcFwFQIgEQuo6gRBqis1qisVclkVMl4a1vspHdffPl6yajqBnAQaVCoEQKDSoVAzgINKhUIzgINKhUKzgUGlQqBnAQXAQBnAoNYFBBnAQaQKAM4CC4CCQM4FBpAQBMDgpEHAgTA4KgcFEog4KRB1KIgcF1HARFQg0qFSiKjguo6gZog4LRo4AzgcGkBUpLOoVNKjqBnUKmlQqBnUKmtQqBlUKmtQqEZVFU1qFSDKoVNaiqCWUBBrUVQrKAg0qFQksoBUNaiqRWUCg1qKoGUBBpAqgJGjRpdSkaBnUcGiNHUDOo6mlRo0oioVNajRoRmjQqao0aNKSyqOprUdQMajRptQdCoxqFTag6AY1CpvQKAY1CpvQKAYVHU2oFAMKhU3oFAMKhU3oFAOeoVN6BQg56hU3oFAOeoVN6CoBhUVTeglYQYK0VTeoqAYVFU3qKhCUo0aNNUaUjA0yRo0abIwaMCMkYNGmyMKRhRgjCkYbIwqgRgjBow3RhSMKOehVDdGDRgGFAodCYxowqOeg6HQmMdAOegUOnWNMYHNQKHTrHrA5qBQ6aBQDloFDqoGsDloFDp1hrEjloFDqXGLWQctBUOqglYQc1BUOnWKgHMrCaHUrBKwDloKh1KwmhFc1CaHVQVAM0YUjDZGFowxLTFGFIw2RhaMLIwTGNGHQmMpMYkc6MKTGdCYykxllIcyYykxnSmMrWWUcyYxpjOpMY0xiRy6x6zr1jTGWUcmses69Y9Ykcmses60xj1CUcmsNZ16x6hKuPWPWdeoeoSOLWGs7NQahI49YtZ26xaySOPWLWdusWsSOLWLWdusS4ySOLWJcZ2LjEuMSOJcYtZ2axLjJKw41xkrjOxcZKsJKw5FYTQ61YTQkkMmsLRhbWmjWHK7rVmjC0YaowtGC5RijC0xmyMNEYLlWCYykxnQmMtMZblHMmMtMZ0JjKTGLpRzJjKTEdSYykxFulHKmIeo60xlJjFyjj1j1HYmIpMRbpRxah6js1j1i6Uceoeo7NY9YuUcWoeo7NYaxdaOLUGo7dYayXKOLULUdusWsdi0cWoWo7VxiXETsKOJcZK4ztXGSuMnYUca4yVxnYuMlcZOxaONcZKsOxcZK4ydi0casIVh2KwhWDsWjkVhCsOtzDNWE7Cj8Nvp7if3i/wCm/wD6OnD6X4jvDMxP3lr/ABPBASnlu/h9CZ6Y4irG7HPvWE+a9jtZycKpKZMce27Y/ifMAJ1+Vv4fRs3p3hY3Vdmaq/4EdkRPNqE8nqPhYkRdmxV7o3E1XL5+pD52BevynZ4e8Z1jxJhWZ0T2qxkf8jTF1hwlRVVMzVRezVYiqvv7LB8/AvXgvl7fN1ziRfw+O97fWr8iY1+SIpvh644yxfDmb720eifVDwIFphL5fT16q9HIxHbpn9KY3q9PikHDzeuOMztgx5My+10YmR9V+h8/AmNeDPPPw9xh69SF2cZZjtTLKKvvlOxz+k+usr214uNMKr45MipkenwSITzk8eBqmEtl+jzPTvM5DEZlzvc1FmqQxFX31Tv5nX6K6q5nFSqOTMyZpnl8fB0yh+GBqMJOXruB13yGPX+kY8eVirMM/CcxJ9S+tPj8z0uDrL0c9iOdkfjVVij8blcnv+7KQfLBmc8MZXHJ9t4nJxZ2I/C9mRjklHMWf5Gr3NYkuc1qe1yo1PqfE+Jy8uB6ZML3Y3p+piq1fgvtQfK5eXO5X5nvyOX9T3K75T4GOrM+/o1fjHs+xc/0jx+NhXNlyMRiItYciq9Y/K32qfhejet+HmfTK1/H/Ze+HY17etU8D5mMuNXp65TPP4w+2cDmYOUy/HyNytRaqrV/KvsVPUdFD4jxuVlwrbDkyY3Sizje5iynh4eZ6Xhdd83GiJlbizokSrkVmRfNO30OfPXzx/n1dOHLhn39H0mglYeLd9obKpHGff8AUi5URqfBY7/IWf7QWdtXGe7t32ZEZC+SKcq7fq6/i+z2lSVaeJZ9oPhbi9571zdo82nY3rriL4szt7fsNXv5KTONuP1XGNWf2enVpKtPw8PV3Af/AGqsXxjJje36xBzcnrXhsWGJly+9jEa3/cqGJ2ZzFctdeuJtj+vRq0lWnjnded1jjS31KuaHR8Khy+ufu/gYFt275nJVPJvj80NV2/Vn8X2evVpCoeDzdacx35W4WJ+450/NTnf1dzln7+NJ9mJv3fhJvGral9T6CrSFQ8Bi6s5rW1V2N6+p78f3k+UJ9Af1bzFRO+JPemPx+ajq2nZqe6chmqHgl6l5quR2xO36KMqvx7G39bOV7MP+R3/oZ1bMHZrfgDEB6nkAAADAQCQDACyCQkAKCQkACCRgABISACQSEjAkrAsgWABILCsAFlDsFhgAWCwAAXHYAClcLgBJCuFwASFcLABJCsEgBJCAAA//2Q==")');
              break;
            case "rain":
              $("#outside-main").css("background-image", 'url("data:image/jpeg;base64,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")');
              break;
            case "snow":
              $("#outside-main").css("background-image", 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRC-0ckzKMkR7WXEtsqlW0nJHXlvtWbFemrN66ryJLDJY4A_3M")');
              break;
            case "sleet":
              $("#outside-main").css("background-image", 'url("data:image/jpeg;base64,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")');
              break;
            case "wind":
              $("#outside-main").css("background-image", 'url("https://i.ytimg.com/vi/vA5uU139x_w/maxresdefault.jpg")');
              break;
            case "fog":
              $("#outside-main").css("background-image", 'url("data:image/jpeg;base64,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")');
              break;
            case "cloudy":
              $("#outside-main").css("background-image", 'url("http://www.hdwallpapersact.com/wp-content/gallery/cloudy-sky/dark-cloudy-sky.jpg")');
              break;
            case "partly-cloudy-day":
               $("#outside-main").css("background-image", 'url("data:image/jpeg;base64,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")');
              break;
            case "partly-cloudy-day":
              $("#outside-main").css("background-image", 'url("http://www.picz.ge/img/s3/1506/27/5/588f7de062a1.jpg")');
              break;
            default:
              $("#outside-main").css("background-image", 'url("http://www.picz.ge/img/s3/1506/27/5/588f7de062a1.jpg")');
          }

          $("#blackBox").css("display", "none");
        }

      });

      // Start of request for weather forecast.


    }
    // End of if navigator.geolocation

  } else {
    $("#testP").html("Looks like your browser doesn't support geolocation");
  }

});
