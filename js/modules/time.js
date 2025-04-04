//time.js

export function showTime() {
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
