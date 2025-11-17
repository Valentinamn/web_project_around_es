// scripts/validate.js

function createErrorSpan(input, className) {
  let span = input.parentNode.querySelector(`.${className}`);
  if (!span) {
    span = document.createElement("span");
    span.classList.add("popup__input-error", className);
    input.insertAdjacentElement("afterend", span);
  }
  return span;
}

// Validación Editar Perfil
export function initEditProfileValidation() {
  const form = document.getElementById("edit-profile-form");
  const nameInput = form.querySelector(".popup__input_type_name");
  const descriptionInput = form.querySelector(".popup__input_type_description");
  const saveButton = form.querySelector(".popup__button");

  nameInput.required = true;
  nameInput.minLength = 2;
  nameInput.maxLength = 40;

  descriptionInput.required = true;
  descriptionInput.minLength = 2;
  descriptionInput.maxLength = 200;

  const nameError = createErrorSpan(nameInput, "popup__input-error_name");
  const descriptionError = createErrorSpan(
    descriptionInput,
    "popup__input-error_description"
  );

  function showError(input, errorElement) {
    if (!input.validity.valid) {
      errorElement.textContent = input.validationMessage;
      input.classList.add("popup__input_type_error");
    } else {
      errorElement.textContent = "";
      input.classList.remove("popup__input_type_error");
    }
  }

  function toggleSaveButton() {
    const isValid = nameInput.validity.valid && descriptionInput.validity.valid;
    saveButton.disabled = !isValid;
    saveButton.classList.toggle("button_inactive", !isValid);
  }

  [nameInput, descriptionInput].forEach((input) => {
    input.addEventListener("input", () => {
      const errorElement = input === nameInput ? nameError : descriptionError;
      showError(input, errorElement);
      toggleSaveButton();
    });
  });

  function resetForm() {
    [nameInput, descriptionInput].forEach((input) => {
      input.classList.remove("popup__input_type_error");
      const error = input.parentNode.querySelector(".popup__input-error");
      if (error) error.textContent = "";
    });
    saveButton.disabled = true;
    saveButton.classList.add("button_inactive");
  }

  return { resetForm, toggleSaveButton };
}

// Validación Nuevo Lugar
export function initNewCardValidation() {
  const form = document.getElementById("new-card-form");
  const nameInput = form.querySelector(".popup__input_type_card-name");
  const urlInput = form.querySelector(".popup__input_type_url");
  const createButton = form.querySelector(".popup__button");

  nameInput.required = true;
  nameInput.minLength = 2;
  nameInput.maxLength = 30;
  urlInput.required = true;
  urlInput.type = "url";

  const nameError = createErrorSpan(nameInput, "popup__input-error_title");
  const urlError = createErrorSpan(urlInput, "popup__input-error_url");

  function showError(input, errorElement) {
    if (!input.validity.valid) {
      errorElement.textContent = input.validationMessage;
      input.classList.add("popup__input_type_error");
    } else {
      errorElement.textContent = "";
      input.classList.remove("popup__input_type_error");
    }
  }

  function toggleCreateButton() {
    const isValid = nameInput.validity.valid && urlInput.validity.valid;
    createButton.disabled = !isValid;
    createButton.classList.toggle("button_inactive", !isValid);
  }

  [nameInput, urlInput].forEach((input) => {
    input.addEventListener("input", () => {
      const errorElement = input === nameInput ? nameError : urlError;
      showError(input, errorElement);
      toggleCreateButton();
    });
  });

  function resetForm() {
    [nameInput, urlInput].forEach((input) => {
      input.classList.remove("popup__input_type_error");
      const error = input.parentNode.querySelector(".popup__input-error");
      if (error) error.textContent = "";
    });
    createButton.disabled = true;
    createButton.classList.add("button_inactive");
  }

  return { resetForm, toggleCreateButton };
}
