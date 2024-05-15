function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.main.temp;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  timeElement.innerHTML = formatDate(date);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = WeatherIcon(response.data.weather[0].icon);
}

function WeatherIcon(icon) {
  const codeMapping = {
    "01d": "fas fa-sun",
    "01n": "fas fa-sun",

    "02d": "fas fa-cloud-sun",
    "02n": "fas fa-cloud-sun",

    "03d": "fas fa-cloud-sun",
    "03n": "fas fa-cloud-sun",

    "04d": "fas fa-cloud-rain",
    "04n": "fas fa-cloud-rain",

    "09d": "fas fa-cloud-sun-rain",
    "09n": "fas fa-cloud-sun-rain",

    "10d": "fas fa-cloud-showers-heavy",
    "10n": "fas fa-cloud-showers-heavy",

    "11d": "fas fa-bolt",
    "11n": "fas fa-bolt",

    "13d": "fas fa-wind",
    "13n": "fas fa-wind",

    "50d": "fas fa-water",
    "50n": "fas fa-water",
  };

  const iconClass = codeMapping[icon];
  if (iconClass) {
    return `<i class="${iconClass}"></i>`;
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "e42b7ace2f914435cbe3a5b48484eb18";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
