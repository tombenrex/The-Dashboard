// api.js
import { fetchData } from "../utils.js";

let countries = [];
// Fetch countries data
export async function fetchCountries() {
  const url = "https://restcountries.com/v3.1/all";
  const data = await fetchData(url);

  countries = data.map((country) => ({
    name: country.name.common,
    latlng: country.latlng || [],
  }));

  return countries;
}

// Fetch weather data for a given country
export async function fetchWeather(countryName) {
  const country = countries.find((c) => c.name === countryName);

  if (!country || country.latlng.length === 0) {
    throw new Error("Invalid country data");
  }

  const [lat, lon] = country.latlng;
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`;

  const weatherData = await fetchData(weatherUrl);
  return weatherData.daily;
}

// Fetch a random background image from a local set of images
export async function fetchBackground() {
  let imageUrl = getRandomLocalImage();
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}

// Helper function to get a random local image URL
function getRandomLocalImage() {
  const localImages = [
    "../img/img1.jpg",
    "../img/img2.jpg",
    "../img/img3.jpg",
    "../img/img4.jpg",
  ];
  return localImages[Math.floor(Math.random() * localImages.length)];
}
