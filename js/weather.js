//weather.js

let countries = [];

// Fetch country list and store in an array
export async function loadCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  countries = data.map((country) => ({
    name: country.name.common,
    latlng: country.latlng || [],
  }));

  // Populate the dropdown with country names
  const countrySelect = document.getElementById("countrySelect");
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });
}

// Show country dropdown when button is clicked
document.getElementById("weather-btn").addEventListener("click", function () {
  const countrySelect = document.getElementById("countrySelect");
  const getWeatherButton = document.getElementById("weatherBtn");

  // Show the dropdown
  countrySelect.style.display = "block";

  // Show "Get Weather" button after a country is selected
  countrySelect.addEventListener("change", function () {
    if (countrySelect.value) {
      getWeatherButton.style.display = "block";
    } else {
      getWeatherButton.style.display = "none";
    }
  });
});

// Fetch 3-day weather forecast for selected country
export async function getWeather() {
  const select = document.getElementById("countrySelect");
  const weatherDiv = document.getElementById("weather");
  const countryName = select.value;

  const country = countries.find((c) => c.name === countryName);

  if (!country || country.latlng.length === 0) {
    alert("Please select a valid country");
    return;
  }

  const [lat, lon] = country.latlng;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const forecast = data.daily;

    let forecastHTML = `<h3>3-Day Weather Forecast for ${countryName}</h3>`;
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
    weatherDiv.style.display = "block"; // Ensure it's visible
  } catch (error) {
    weatherDiv.innerHTML = "❌ Error fetching weather data.";
  }
}
