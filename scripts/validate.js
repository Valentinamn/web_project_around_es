// Validación de formularios

function createErrorSpan(input) {
  const span = document.createElement("span");
  span.classList.add("popup__error-message");
  input.insertAdjacentElement("afterend", span);
  return span;
}

function showInputError(input) {
  const span = input.nextElementSibling;
  if (!input.validity.valid) {
    span.textContent = input.validationMessage;
  } else {
    span.textContent = "";
  }
}

function toggleButton(button, inputs) {
  const allValid = inputs.every((input) => input.validity.valid);
  button.disabled = !allValid;
}

function resetForm(inputs, button) {
  inputs.forEach((input) => (input.value = ""));
  button.disabled = true;
}

function enableValidation(inputs, button) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      showInputError(input);
      toggleButton(button, inputs);
    });
  });
}
