// Feature #1
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

defaultCity('Lisbon');

let celsiusTemperature = null;

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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahConversion = (celsiusTemperature * 9) / 5 + 32;
  let displayTemp = document.querySelector('#current-temp');
  displayTemp.innerHTML = Math.round(fahConversion);
  fahrenheitTemp.classList.add('degrees-link-celsius');
  celsiusTemp.classList.remove('degrees-link-celsius');
  celsiusTemp.classList.add('degrees-link');
}

let fahrenheitTemp = document.querySelector('#fah-temp');
fahrenheitTemp.addEventListener('click', showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let displayTemp = document.querySelector('#current-temp');
  displayTemp.innerHTML = Math.round(celsiusTemperature);
  celsiusTemp.classList.add('degrees-link-celsius');
  fahrenheitTemp.classList.remove('degrees-link-celsius');
  fahrenheitTemp.classList.add('degrees-link');
}

let celsiusTemp = document.querySelector('#celsius-temp');
celsiusTemp.addEventListener('click', showCelsiusTemp);
