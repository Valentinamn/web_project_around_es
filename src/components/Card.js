export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDelete,
    handleLike
  ) {
    this._data = data; // incluye likes, name, link, _id
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
      this._handleLike(this); // ahora solo le pasamos la instancia
    });

    // Delete
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete(this);
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
    this.updateLikes(this._data.likes || [], this._data.currentUserId);

    this._setEventListeners();
    return this._element;
  }

  // ✅ Método para actualizar likes
  updateLikes(likes = [], currentUserId) {
    this._data.likes = likes;
    this._isLiked =
      Array.isArray(likes) && likes.some((like) => like._id === currentUserId);
    this._likeButton.classList.toggle("card__like-button_liked", this._isLiked);
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
