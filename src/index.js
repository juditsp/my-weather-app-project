function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let currentDate = new Date();
let hours = currentDate.getHours();
let minutes = addZero(currentDate.getMinutes());
let year = currentDate.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let day = days[currentDate.getDay()];
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
let month = months[currentDate.getMonth()];
document.querySelector(
  "#date-time"
).innerHTML = `${day}, ${month} ${year} │ ${hours}:${minutes}`;

function showTemp(response) {
  let temperature = Math.round(response.data.temperature.current);
  document.querySelector("#location").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = `${temperature}ºC`;
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  document.querySelector("#location").innerHTML = `${cityInput.value}`;
  let apiKey = "709f19ffdb2oca04113bc514793eb5bt";
  let unit = "metric";
  let city = document.querySelector("#city-input").value;
  let apiEndPoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndPoint}?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
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

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", enterCity);
