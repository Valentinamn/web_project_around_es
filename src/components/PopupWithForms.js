import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form
      ? Array.from(this._form.querySelectorAll("input"))
      : [];
    this._submitHandler = this._submitHandler.bind(this);
  }

  // Obtiene los valores actuales de los inputs
  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  // ✅ Precarga valores en los inputs del formulario
  setInputValues(data) {
    if (!this._form) return;
    this._inputList.forEach((input) => {
      if (data[input.name] !== undefined) {
        input.value = data[input.name];
      }
    });
  }

  // Manejador de submit
  _submitHandler(evt) {
    evt.preventDefault();
    const values = this._getInputValues();
    this._handleFormSubmit(values);
  }

  // Configura listeners
  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", this._submitHandler);
    }
  }

  // Cierra el popup y resetea el formulario
  close() {
    if (this._form) this._form.reset();
    super.close();
  }

  // Retorna el elemento formulario si se necesita
  getFormElement() {
    return this._form;
  }
}
