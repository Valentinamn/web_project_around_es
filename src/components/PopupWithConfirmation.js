import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitAction = null;
    this._form = this._popup.querySelector("form");
    this._submitHandler = this._submitHandler.bind(this);
  }

  // Abre el popup y asigna la acción de confirmación
  setSubmitAction(action) {
    this._submitAction = action;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    if (this._submitAction) this._submitAction();
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", this._submitHandler);
    }
  }

  close() {
    if (this._form) this._form.reset();
    super.close();
  }
}
