// ---------------- VALIDACIÓN DE FORMULARIOS ----------------

// Crear span de error
function createErrorSpan(input) {
  const span = document.createElement("span");
  span.classList.add("popup__error-message");
  input.insertAdjacentElement("afterend", span);
  return span;
}

// Mostrar mensaje de error
function showInputError(input, span) {
  if (!input.validity.valid) {
    span.textContent = input.validationMessage;
    input.classList.add("popup__input_type_error");
  } else {
    span.textContent = "";
    input.classList.remove("popup__input_type_error");
  }
}

// Activar/desactivar botón
function toggleButton(button, inputs) {
  const allValid = inputs.every((input) => input.validity.valid);
  button.disabled = !allValid;
  button.classList.toggle("button_inactive", !allValid);
}

// Resetear formulario
function resetForm(inputs, button) {
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("popup__input_type_error");
    const span = input.nextElementSibling;
    if (span) span.textContent = "";
  });
  button.disabled = true;
  button.classList.add("button_inactive");
}

// Habilitar validación
function enableValidation(inputs, button) {
  inputs.forEach((input) => {
    const span = createErrorSpan(input);
    input.addEventListener("input", () => {
      showInputError(input, span);
      toggleButton(button, inputs);
    });
  });
}
