/* import { accessKey } from "../key.js";
const url = `https://api.unsplash.com/photos/random?query=nature&client_id=${accessKey}`;

function changeBackground() {
  const localImages = [
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
  ];

  // Function to get a random local image
  function getRandomLocalImage() {
    const randomIndex = Math.floor(Math.random() * localImages.length);
    return localImages[randomIndex];
  }

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
window.addEventListener("load", changeBackground);

const bgButton = document.getElementById("bg-btn");

bgButton.addEventListener("click", function () {
  changeBackground(); //
});
 */

//script.js
import { setupTitleEditing } from "./title.js";

let accessKey; // Declare a variable for accessKey

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
});

const bgButton = document.getElementById("bg-btn");
bgButton.addEventListener("click", function () {
  changeBackground();
});
setupTitleEditing();
