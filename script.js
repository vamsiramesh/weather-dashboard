const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");
const error = document.getElementById("error");

async function getWeather(city) {
    try {
        error.textContent = "";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;
        temp.textContent = data.main.temp;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
        condition.textContent = data.weather[0].main;

    } catch (err) {
        error.textContent = err.message;
        cityName.textContent = "--";
        temp.textContent = "--";
        humidity.textContent = "--";
        wind.textContent = "--";
        condition.textContent = "--";
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        error.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});