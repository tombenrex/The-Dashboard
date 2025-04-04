// api.js
import { fetchData } from "../utils.js";
import { weatherKey, backgroundImgKey } from "../key.js";
import { getRandomLocalImage } from "./background.js";

let countries = [];

// Fetch countries data
export async function fetchCountries() {
  const url = "https://restcountries.com/v3.1/all";
  const data = await fetchData(url);

  countries = data.map((country) => ({
    name: country.name.common,
    latlng: country.latlng || [], // Latitude and longitude for the country
  }));

  return countries;
}

// Fetch weather forecast data for a given country using OpenWeather
export async function fetchWeather(countryName) {
  const country = countries.find((c) => c.name === countryName);

  if (!country || country.latlng.length === 0) {
    throw new Error("Invalid country data");
  }

  const [lat, lon] = country.latlng;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`;

  const weatherData = await fetchData(weatherUrl);

  // Extract relevant forecast data for the next 3 days (8 data points per day)
  const forecastData = weatherData.list.slice(0, 24 * 3).map((item) => ({
    time: item.dt_txt, // Date and time of the forecast
    temperature: item.main.temp, // Current temperature for that time
    weather_code: item.weather[0].icon, // Weather icon code for that time
  }));

  return forecastData;
}

// Fetch icon URL from OpenWeather based on the icon code
export async function fetchWeatherIcon(iconCode) {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return iconUrl; // Returning the URL for the weather icon
}
export async function fetchBackground() {
  let imageUrl = getRandomLocalImage();

  if (backgroundImgKey) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=${backgroundImgKey}`
      );
      const data = await response.json();

      if (data?.urls?.regular) {
        imageUrl = data.urls.regular;
      } else {
        console.error("Invalid Unsplash response, using fallback.");
      }
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
    }
  }

  document.body.style.backgroundImage = `url('${imageUrl}')`;
}
