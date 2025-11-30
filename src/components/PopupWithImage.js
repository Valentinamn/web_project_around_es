import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  // open recibe name y link como parámetros separados
  open(name, link) {
    if (this._image) {
      this._image.src = link;
      this._image.alt = name;
    }
    if (this._caption) this._caption.textContent = name;
    super.open();
  }
}
