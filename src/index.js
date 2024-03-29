function refreshWeather(response) {
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.main.temp;
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let speedElement = document.querySelector("#speed");
let timeElement = document.querySelector("#time");


console.log(response.data);

cityElement.innerHTML = response.data.name;
timeElement.innerHTML = "Tuesday 14:50";
humidityElement.innerHTML = `${response.data.main.humidity}%`;
speedElement.innerHTML = `${response.data.wind.speed}km/h`;
descriptionElement.innerHTML = response.data.weather[0].description;
temperatureElement.innerHTML = Math.round(temperature);

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