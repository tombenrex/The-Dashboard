// weather.js
import { fetchCountries, fetchWeather } from "./api.js";
export function setupWeatherModule() {
  const countrySelect = document.getElementById("countrySelect");
  const weatherDiv = document.getElementById("weather");
  const getWeatherButton = document.getElementById("select-weather-btn");
  const weatherToggleButton = document.getElementById("weather-btn");

  weatherToggleButton.addEventListener("click", () => {
    weatherToggleButton.style.display = "none";
    countrySelect.style.display = "inline-block";
    getWeatherButton.style.display = "inline-block";
  });

  async function populateCountries() {
    try {
      const countries = await fetchCountries();
      countries.sort((a, b) => a.name.localeCompare(b.name));

      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name;
        option.textContent = country.name;
        countrySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  populateCountries();

  getWeatherButton.addEventListener("click", async () => {
    const selectedCountry = countrySelect.value;
    try {
      const weatherData = await fetchWeather(selectedCountry);
      displayWeatherData(weatherData, selectedCountry);
      getWeatherButton.style.display = "none";
      countrySelect.style.display = "none";
      weatherToggleButton.style.display = "inline-block";
    } catch (error) {
      weatherDiv.innerHTML = "❌ Error fetching weather data.";
    }
  });

  function displayWeatherData(forecast, countryName) {
    let forecastHTML = `<h3>${countryName}</h3>`;
    for (let i = 0; i < 3; i++) {
      const date = new Date(forecast.time[i]);
      const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
      const maxTemp = forecast.temperature_2m_max[i];
      const minTemp = forecast.temperature_2m_min[i];
      const precipitation = forecast.precipitation_sum[i];
      const windSpeed = forecast.windspeed_10m_max[i];

      forecastHTML += `
        <div>
          <strong>${dayOfWeek}</strong><br>
          🌡️ Max: ${maxTemp}°C | Min: ${minTemp}°C<br>
          💧 Precipitation: ${precipitation} mm<br>
          💨 Wind: ${windSpeed} km/h<br>
        </div>
        <hr>
      `;
    }

    weatherDiv.innerHTML = forecastHTML;
    weatherDiv.style.display = "block";
  }
}
