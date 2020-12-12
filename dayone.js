window.addEventListener("load", () => {
  // Coords
  let long;
  let lat;

  // Selectors
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationIcon = document.querySelector('.weather-icon');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely,hourly,daily&appid=f80486b64cd976adbdfb612485fc2d53`;

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          const { temp, weather } = data.current;
          const icon = weather[0].icon;
          console.log(data);
          // Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = weather[0].description;
          locationTimezone.textContent = data.timezone;
          
          locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: 'white'});
    const currentIcon = icon;
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

// f80486b64cd976adbdfb612485fc2d53
