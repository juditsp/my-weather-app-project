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
).innerHTML = `${day}, ${month} ${year}, ${hours}:${minutes}`;

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML = `${temperature}ºC`;
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  document.querySelector("#location").innerHTML = `${cityInput.value}`;
  let apiKey = "6960481835abb1d29444444effb9d99d";
  let unit = "metric";
  let city = document.querySelector("#city-input").value;
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "6960481835abb1d29444444effb9d99d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", enterCity);
