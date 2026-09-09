import { API_KEY } from "./config.js";
const inputBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const errorMessage = document.querySelector(".error");
const feelLike = document.querySelector(".feelLike");
const temp_max = document.querySelector(".temp_max");
const temp_min = document.querySelector(".temp_min");
async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    updateWeatherUI(data);
}
function updateWeatherUI(data) {
    document.querySelector(".temp").innerHTML =
        `${Math.round(data.main.temp)}&deg;C`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed}Km/h`;
    document.querySelector(".feelLike").innerHTML =
        `${Math.round(data.main.feels_like)}&deg;C`;
    document.querySelector(".temp_max").innerHTML =
        `${Math.round(data.main.temp_max)}&deg;C`;
    document.querySelector(".temp_min").innerHTML =
        `${Math.round(data.main.temp_min)}&deg;C`;
    const weatherIcons = {
        Clear: "src/assets/clear.png" /*aquipuede que tenga el error */,
        Snow: "src/assets/snow.png",
        Rain: "src/assets/rain.png",
        Clouds: "src/assets/clouds.png",
    };
    weatherIcon.src =
        weatherIcons[data.weather[0].main] || "src/assets/rain.png";
    weather.style.display = "block";
}
searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});
inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(inputBox.value);
    }
});
//# sourceMappingURL=main.js.map