function loadHeaderContent(header) {
  const headerContent = localStorage.getItem("headerContent") || "Welcome User";
  header.textContent = headerContent;
  document.title = headerContent;
}

function saveHeader(header, newValue) {
  const value = newValue || "Welcome User";
  localStorage.setItem("headerContent", value);
  header.textContent = value;
  document.title = value;
}

function createInputForEditing(header) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = header.textContent;

  header.textContent = "";
  header.appendChild(input);
  input.focus();

  return input;
}

export function setupTitleEditing() {
  const header = document.getElementById("editable");

  loadHeaderContent(header);

  header.addEventListener("click", () => {
    const input = createInputForEditing(header);

    input.addEventListener("blur", () => saveHeader(header, input.value));
    input.addEventListener(
      "keydown",
      (e) => e.key === "Enter" && saveHeader(header, input.value)
    );
  });
}
