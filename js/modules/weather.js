//weather.js

import { fetchCountries, fetchWeather, fetchWeatherIcon } from "./api.js";

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
      const forecastData = await fetchWeather(selectedCountry);
      displayWeatherData(forecastData, selectedCountry);
      getWeatherButton.style.display = "none";
      countrySelect.style.display = "none";
      weatherToggleButton.style.display = "inline-block";
    } catch (error) {
      weatherDiv.innerHTML = "❌ Error fetching weather data.";
    }
  });
  async function displayWeatherData(forecastData, countryName) {
    let forecastHTML = `<h3 class="country">${countryName}</h3>`;

    // Konvertera väderdata till en grupp per dag
    const groupedByDay = forecastData.reduce((acc, data) => {
      const date = new Date(data.time);
      const dateString = date.toISOString().split("T")[0]; // Datum i formatet YYYY-MM-DD

      if (!acc[dateString]) {
        acc[dateString] = [];
      }

      acc[dateString].push(data);
      return acc;
    }, {});

    let count = 0;
    for (const dateString in groupedByDay) {
      if (count >= 3) break; // Stopp när vi har visat tre dagar

      const dailyData = groupedByDay[dateString][0]; // Välj den första posten för dagen
      const date = new Date(dailyData.time);
      const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
      const temperature = dailyData.temperature;
      const weatherCode = dailyData.weather_code;

      let weatherIconURL = "";

      try {
        weatherIconURL = await fetchWeatherIcon(weatherCode);
      } catch (error) {
        console.error("Error fetching weather icon:", error);
        weatherIconURL = "https://via.placeholder.com/50"; // Fallback-ikon
      }

      forecastHTML += `
        <section class="weather-section">
          
          <img src="${weatherIconURL}" alt="Weather icon">
          <p class="day">${dayOfWeek}</p>
          <p class="temp">${temperature}°C</p>
        </section>
        
      `;

      count++;
    }

    if (count < 3) {
      forecastHTML += "<p>❌ Not enough weather data available.</p>";
    }

    weatherDiv.innerHTML = forecastHTML;
    weatherDiv.style.display = "block";
  }
}
