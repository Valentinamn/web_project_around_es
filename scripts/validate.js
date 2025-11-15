// -------------------- VALIDACIÓN FORMULARIOS --------------------

// Crear span de error
function createErrorSpan(input) {
  let span = input.parentNode.querySelector(
    `.popup__input-error_${input.name}`
  );

  if (!span) {
    span = document.createElement("span");
    span.classList.add(
      "popup__input-error",
      `popup__input-error_${input.name}`
    );
    input.insertAdjacentElement("afterend", span);
  }
  return span;
}

// Mostrar error
function showInputError(input) {
  const errorElement = input.parentNode.querySelector(
    `.popup__input-error_${input.name}`
  );

  if (!input.validity.valid) {
    errorElement.textContent = input.validationMessage;
    input.classList.add("popup__input_type_error");
  } else {
    errorElement.textContent = "";
    input.classList.remove("popup__input_type_error");
  }
}

// Activar/desactivar botón
function toggleButton(button, inputs) {
  const isValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle("button_inactive", !isValid);
}

// Resetear formulario
function resetForm(inputs, button) {
  inputs.forEach((input) => {
    input.classList.remove("popup__input_type_error");
    const error = input.parentNode.querySelector(
      `.popup__input-error_${input.name}`
    );
    if (error) error.textContent = "";
  });

  if (button) {
    button.disabled = true;
    button.classList.add("button_inactive");
  }
}

// Inicializar validación
function enableValidation(inputs, button) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      showInputError(input);
      toggleButton(button, inputs);
    });
  });
}

export {
  createErrorSpan,
  showInputError,
  toggleButton,
  resetForm,
  enableValidation,
};
