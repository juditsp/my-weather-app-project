let date = new Date();
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[date.getMonth()];
let year = date.getFullYear();

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let hours = addZero(date.getHours());
let minutes = addZero(date.getMinutes());
document.querySelector(
  "#date-time"
).innerHTML = `${day}, ${month} ${year} │ ${hours}:${minutes}`;

function showTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#main-icon");

  celsiusTemp = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "709f19ffdb2oca04113bc514793eb5bt";
  let apiEndPoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndPoint}?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "709f19ffdb2oca04113bc514793eb5bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrentheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrentheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Barcelona");
