export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
    this._button = this._form.querySelector(config.submitButtonSelector);
    this._inputs = Array.from(
      this._form.querySelectorAll(config.inputSelector)
    );
  }

  // Mostrar u ocultar mensaje de error
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      input.classList.add(this._config.inputErrorClass);
    }
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    if (errorElement) {
      errorElement.textContent = "";
      input.classList.remove(this._config.inputErrorClass);
    }
  }

  // Validación individual
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // Habilitar/deshabilitar botón
  _toggleButtonState() {
    const isFormValid = this._inputs.every((input) => input.validity.valid);

    if (isFormValid) {
      this._button.removeAttribute("disabled");
    } else {
      this._button.setAttribute("disabled", true);
    }
  }

  // Eventos
  _setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Método público
  enableValidation() {
    this._setEventListeners();
  }

  // Reset público
  resetValidation() {
    this._inputs.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }
}
