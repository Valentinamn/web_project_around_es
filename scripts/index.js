// --- POPUPS ---
const popups = document.querySelectorAll(".popup");

// Función para abrir popup
function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscClose);
}

// Función para cerrar popup
function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscClose);
}

// Cerrar popup con Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_open");
    if (openPopup) closePopup(openPopup);
  }
}

// Cerrar popup al hacer clic en superposición
popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup(popup);
  });
});

// Botones de cerrar
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// --- VALIDACIÓN FORMULARIOS ---
// Función general para mostrar mensajes de error
function validateInput(input) {
  const errorSpan = input.nextElementSibling;
  if (!input.validity.valid) {
    errorSpan.textContent = input.validationMessage;
    errorSpan.style.color = "red";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
}

// Función para activar/desactivar botón según validez
function toggleButton(form, button) {
  const inputs = Array.from(form.querySelectorAll("input"));
  const isValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.style.backgroundColor = isValid ? "#2B6CB0" : "#A0AEC0"; // colores de ejemplo
}

// --- FORMULARIO EDITAR PERFIL ---
const editProfileForm = document.getElementById("edit-profile-form");
const nameInput = editProfileForm.querySelector('input[name="name"]');
const descriptionInput = editProfileForm.querySelector(
  'input[name="description"]'
);
const saveProfileButton = editProfileForm.querySelector(
  'button[type="submit"]'
);

// Añadimos validación de longitud
nameInput.setAttribute("required", true);
nameInput.setAttribute("minlength", 2);
nameInput.setAttribute("maxlength", 40);

descriptionInput.setAttribute("required", true);
descriptionInput.setAttribute("minlength", 2);
descriptionInput.setAttribute("maxlength", 200);

[nameInput, descriptionInput].forEach((input) => {
  // Insertar un span para error si no existe
  if (
    !input.nextElementSibling ||
    !input.nextElementSibling.classList.contains("error-message")
  ) {
    const span = document.createElement("span");
    span.classList.add("error-message");
    input.insertAdjacentElement("afterend", span);
  }

  input.addEventListener("input", () => {
    validateInput(input);
    toggleButton(editProfileForm, saveProfileButton);
  });
});

// --- FORMULARIO NUEVA TARJETA ---
const newCardForm = document.getElementById("new-card-form");
const titleInput = newCardForm.querySelector('input[name="place-name"]');
const urlInput = newCardForm.querySelector('input[name="link"]');
const saveCardButton = newCardForm.querySelector('button[type="submit"]');

titleInput.setAttribute("required", true);
titleInput.setAttribute("minlength", 2);
titleInput.setAttribute("maxlength", 30);
urlInput.setAttribute("required", true);
urlInput.setAttribute("type", "url");

[titleInput, urlInput].forEach((input) => {
  if (
    !input.nextElementSibling ||
    !input.nextElementSibling.classList.contains("error-message")
  ) {
    const span = document.createElement("span");
    span.classList.add("error-message");
    input.insertAdjacentElement("afterend", span);
  }

  input.addEventListener("input", () => {
    validateInput(input);
    toggleButton(newCardForm, saveCardButton);
  });
});
