import type { WeatherResponse } from "./types";
import { API_KEY } from "./config.js";

const inputBox = document.querySelector<HTMLInputElement>(".search-bar input")!;
const searchBtn =
  document.querySelector<HTMLButtonElement>(".search-bar button")!;
const weatherIcon = document.querySelector<HTMLImageElement>(".weather-icon");
const weather = document.querySelector<HTMLElement>(".weather");
const errorMessage = document.querySelector<HTMLElement>(".error");

async function checkWeather(city: string) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const response = await fetch(apiUrl);
  const data: WeatherResponse = await response.json();

  console.log(data);
  updateWeatherUI(data);
}

function updateWeatherUI(data: WeatherResponse) {
  document.querySelector(".temp")!.innerHTML =
    `${Math.round(data.main.temp)}&deg;C`;
  document.querySelector(".city")!.innerHTML = data.name;
  document.querySelector(".humidity")!.innerHTML = `${data.main.humidity}%`;
  document.querySelector(".wind")!.innerHTML = `${data.wind.speed}Km/h`;

  const weatherIcons: Record<string, string> = {
    Clear: "src/assets/clear.png" /*aquipuede que tenga el error */,
    Snow: "src/assets/snow.png",
    Rain: "src/assets/rain.png",
    Clouds: "src/assets/clouds.png",
  };

  weatherIcon!.src =
    weatherIcons[data.weather[0].main] || "src/assets/rain.png";
  weather!.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(inputBox.value);
  }
});
