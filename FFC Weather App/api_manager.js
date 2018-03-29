if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        $("#data").html("latitude: " + latitude + "<br>longitude: " + longitude);

        const url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

        // Call the fetch function passing the url of the API as a parameter
        fetch(url) // We ask a request (the data) to the server 
            .then(response =>  {
                  //console.log(response, "response");
                  response.json().then(data => {
                console.log(data, "data");
                temperature = data.main.temp;
                locName = data.name;
                locCountry = data.sys.country;
                weather = data.weather[0].main; // it's an object
                 console.log(weather, "weather");
               // icon = data.weather[0].icon;
              // icon = $('#disp').attr(result.weather[0].main);
              console.log(weather, "weather");
              iconsNew(weather);
                   // console.log(icon,"icon");
                    
                    
                /*console.log(data.weather[0]);*/

                $("#location").text(locName + ", " + locCountry);
                $("#tempCelsius").text(temperature.toFixed(0) + " C°");
                $("#tempFahrenheit").text(Fahrenheit(temperature).toFixed(0) + " F°"); //console.log(Fahrenheit(temperature), "Fahrenheit");
            // If you have Celsius hide and show Fahrenheit      
         
          function showHide(event, data){
                  // console.log(event.currentTarget, "event");
                  $(".generalTemp").toggle();
                 
                }
           $(".generalTemp").on("click", showHide)
          
                $("#weather").text(weather);
                 $("#icons").attr("src", icon);
                   
            });
                  })
            .catch(function () {
                console.log("catch : there is an error "); // This is where you run code if the server returns any errors
            });
    });
}



function Fahrenheit(celsius){
     var F = (celsius * 1.8) + 32;
    return F;
}



function iconsNew(disp){
  console.log(disp, "disp");
  switch (disp){
    case 'Drizzle':
      $('.sun-shower').removeClass('hide');
      break;
    case 'Clouds':
      $('.cloudy').removeClass('hide');
      break;
    case 'Rain':
      $('.rainy').removeClass('hide');
      break;
    case 'snow':
      $('.flurries').removeClass('hide');
      break;
    case 'clear':
      $('.sunny').removeClass('hide');
      break;
    case 'thunderstorm':
      $('thunder-storm').removeClass('hide');
      break;
    default:
      $('.sunny').removeClass('hide');
  }
}

function addIcon(desc){
  $('div.' + desc).removeClass('hide');
}
