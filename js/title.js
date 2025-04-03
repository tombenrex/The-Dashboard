//title.js

const header = document.getElementById("editable");

if (localStorage.getItem("headerContent")) {
  header.textContent = localStorage.getItem("headerContent");
  document.title = localStorage.getItem("headerContent");
}

function saveHeader(newValue) {
  if (newValue === "") {
    newValue = "Welcome User";
  }
  localStorage.setItem("headerContent", newValue);
  header.textContent = newValue;
  document.title = newValue;
}
function setupTitleEditing() {
  header.addEventListener("click", function () {
    const input = document.createElement("input");
    input.id = "h1-input";
    input.type = "text";
    header.textContent = "";
    input.value = header.textContent;

    header.appendChild(input);
    input.focus();

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        saveHeader(input.value);
      }
    });

    input.addEventListener("blur", function () {
      saveHeader(input.value);
    });
  });
}
export { setupTitleEditing };
