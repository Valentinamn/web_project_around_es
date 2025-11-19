export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Obtiene el template
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return template;
  }

  // Maneja el botón de like
  _setLikeButton() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_is-active");
    });
  }

  // Maneja el botón de eliminar
  _setDeleteButton() {
    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
  }

  // Maneja click en la imagen
  _setImageClick() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Crea toda la tarjeta
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setLikeButton();
    this._setDeleteButton();
    this._setImageClick();

    return this._element;
  }
}
