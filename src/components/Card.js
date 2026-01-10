export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDelete,
    handleLike
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._isLiked = data.isLiked;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    // Imagen
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );

    // Like
    this._likeButton.addEventListener("click", () => {
      this._handleLike(this, this._data, this._likeButton);
    });

    // Delete
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete(this, this._data);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Estado inicial del like
    if (this._isLiked)
      this._likeButton.classList.add("card__like-button_liked");

    this._setEventListeners();
    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
