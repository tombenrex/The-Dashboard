// app.js

import { fetchBackground, fetchCountries } from "./modules/api.js";
import { setupWeatherModule } from "./modules/weather.js";
import { setupTitleEditing } from "./modules/ui.js";
import { showTime } from "./modules/time.js";

async function initializeApp() {
  try {
    setupTitleEditing();
    setupWeatherModule();
    showTime();
    setInterval(showTime, 1000);

    await fetchCountries();
    await fetchBackground();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
