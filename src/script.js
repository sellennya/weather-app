function formatDate(date) {
  let week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Saturday',
  ];

  let weekDay = week[date.getDay()];
  let hour =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;

  let minutes =
    currentDate.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : `${date.getMinutes()}`;

  return `${weekDay} ${hour}:${minutes}`;
}

let updatedDate = document.querySelector('#weather-current-date');
let currentDate = new Date();

updatedDate.innerHTML = formatDate(currentDate);

function defaultCity(city) {
  let apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
  let apiKey = '037f5c727f06280e77af4e476422de25';
  let units = 'metric';
  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemperature);
}

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let currentDay = week[day];
  return currentDay;
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector('#forecast');

  let forecastHTML = '';
  forecastData.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  <div class="col">
              <p>${formatWeekDay(forecastDay.dt)}</p>
              <img
              class='forecast-icon'
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"></>
              <div>
                <span class="max-temp">${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="min-temp">${Math.round(
                  forecastDay.temp.min
                )}°</span> 
              </div>
            </div>`;
    }
  });
  forecast.innerHTML = forecastHTML;
}

defaultCity('Lisbon');

let celsiusTemperature = null;

function getForecast(coordinates) {
  let apiEndpoint = 'https://api.openweathermap.org/data/2.5/onecall';
  let apiKey = '037f5c727f06280e77af4e476422de25';
  let units = 'metric';
  let apiUrl = `${apiEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let cityName = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].main;
  let icon = response.data.weather[0].icon;
  let displayTemp = document.querySelector('#current-temp');
  let displayCityName = document.querySelector('#city-display');
  let displayHumidity = document.querySelector('#humidity');
  let displayWind = document.querySelector('#wind');
  let displayDescription = document.querySelector('#description');
  let displayIcon = document.querySelector('#icon');
  displayTemp.innerHTML = temperature;
  displayCityName.innerHTML = cityName;
  displayHumidity.innerHTML = `Humidity: ${humidity}%`;
  displayWind.innerHTML = `Wind: ${wind} km/h`;
  displayDescription.innerHTML = description;
  displayIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  displayIcon.setAttribute('alt', description);

  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
  let apiKey = '037f5c727f06280e77af4e476422de25';
  let units = 'metric';
  let citySearch = document.querySelector('#city-search');
  let apiUrl = `${apiEndpoint}?q=${citySearch.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemperature);
}

let citySearch = document.querySelector('#search-form');
citySearch.addEventListener('submit', showCity);

function onClickCurrentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let buttonClick = document.querySelector('#current-location');
buttonClick.addEventListener('click', onClickCurrentButton);

function showCurrrentDetails(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let displayTemp = document.querySelector('#current-temp');
  let displayCity = document.querySelector('#city-display');
  displayTemp.innerHTML = currentTemp;
  displayCity.innerHTML = currentCity;
}

function showCurrentPosition(position) {
  let apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
  let apiKey = '037f5c727f06280e77af4e476422de25';
  let units = 'metric';
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrrentDetails);
}
