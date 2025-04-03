//script.js
import { setupTitleEditing } from "./title.js";
import { loadCountries, getWeather } from "./weather.js";

let accessKey;

async function loadAccessKey() {
  try {
    const module = await import("../key.js");
    accessKey = module.accessKey;
  } catch (error) {
    console.error("key.js not available, proceeding without accessKey", error);
  }
}

function changeBackground() {
  const localImages = [
    "../img/img1.jpg",
    "../img/img2.jpg",
    "../img/img3.jpg",
    "../img/img4.jpg",
  ];

  function getRandomLocalImage() {
    const randomIndex = Math.floor(Math.random() * localImages.length);
    return localImages[randomIndex];
  }

  const url = accessKey
    ? `https://api.unsplash.com/photos/random?query=nature&client_id=${accessKey}`
    : "";

  if (url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
      })
      .catch((error) => {
        console.error("Error fetching image:", error);

        const randomLocalImage = getRandomLocalImage();
        document.body.style.backgroundImage = `url('img/${randomLocalImage}')`;
      });
  } else {
    const randomLocalImage = getRandomLocalImage();
    document.body.style.backgroundImage = `url('img/${randomLocalImage}')`;
  }
}

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString("sv-SE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("date").innerText = date;
  document.getElementById("time").innerText = time;
}

updateDateTime();
setInterval(updateDateTime, 1000);

window.addEventListener("load", async () => {
  await loadAccessKey();
  changeBackground();
  await loadCountries(); // ✅ Ensure countries are loaded first
});

const bgButton = document.getElementById("bg-btn");
bgButton.addEventListener("click", function () {
  changeBackground();
});

document.addEventListener("DOMContentLoaded", () => {
  const weatherBtn = document.getElementById("weather-btn");
  const countrySelect = document.getElementById("countrySelect");
  const getWeatherBtn = document.getElementById("weatherBtn");
  const weatherDiv = document.getElementById("weather");

  // Hide weather div initially
  weatherDiv.style.display = "none";

  // Step 1: Clicking "Today's Weather" hides the button and shows the select menu
  weatherBtn.addEventListener("click", () => {
    weatherBtn.style.display = "none"; // Hide "Today's Weather" button
    countrySelect.style.display = "block"; // Show dropdown
    getWeatherBtn.style.display = "block"; // Show "Get Weather" button
  });

  // Step 2: When clicking "Get Weather," it should fetch weather and update UI
  getWeatherBtn.addEventListener("click", async () => {
    const selectedCountry = countrySelect.value;
    if (!selectedCountry) return;

    await getWeather(); // Call the function from `weather.js`

    // Hide dropdown and button after fetching
    countrySelect.style.display = "none";
    getWeatherBtn.style.display = "none";

    // Show the weather forecast
    weatherDiv.style.display = "block";
    weatherBtn.style.display = "block";
  });
});

setupTitleEditing();
