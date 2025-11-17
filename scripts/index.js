import {
  initEditProfileValidation,
  initNewCardValidation,
} from "./validate.js";

// -------------------- Tarjetas iniciales --------------------
const initialCards = [
  { name: "Latemar", link: "./images/latemar.jpg" },
  { name: "Montañas Calvas", link: "./images/montanas_calvas.jpg" },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/vanois_national_park.jpg",
  },
  { name: "Valle de Yosemite", link: "./images/yosemite.jpg" },
];

// -------------------- Funciones comunes de modal --------------------
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) closeModal(openPopup);
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});

// -------------------- Modal Perfil --------------------
const editProfileButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeEditButton = editModal.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Inicializar validación
const editProfileValidation = initEditProfileValidation();
const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description"
);

// Abrir popup Editar perfil
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  editProfileValidation.resetForm();
  editProfileValidation.toggleSaveButton();
  openModal(editModal);
});

closeEditButton.addEventListener("click", () => closeModal(editModal));

// Enviar formulario Editar perfil
const editProfileForm = document.getElementById("edit-profile-form");
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (nameInput.validity.valid && descriptionInput.validity.valid) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editModal);
  }
});

// -------------------- Tarjetas dinámicas --------------------
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

// Modal imagen grande
const imageModal = document.getElementById("image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImg = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));

function openImageModal(name, link) {
  imageModalImg.src = link;
  imageModalImg.alt = name;
  imageModalCaption.textContent = name;
  openModal(imageModal);
}

function getCardElement({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", () => openImageModal(name, link));

  return cardElement;
}

function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

// Renderizar tarjetas iniciales
initialCards.forEach((card) => renderCard(card, cardsContainer));

// Eliminar tarjetas
cardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__delete-button")) {
    event.target.closest(".card").remove();
  }
});

// -------------------- Modal Nuevo Lugar --------------------
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.getElementById("new-card-popup");
const closeAddCardButton = addCardModal.querySelector(".popup__close");
const newCardForm = document.getElementById("new-card-form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// Inicializar validación
const newCardValidation = initNewCardValidation();

// Abrir popup Nuevo Lugar
addCardButton.addEventListener("click", () => {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  newCardValidation.resetForm();
  newCardValidation.toggleCreateButton();
  openModal(addCardModal);
});

closeAddCardButton.addEventListener("click", () => closeModal(addCardModal));

// Enviar formulario Nuevo Lugar
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (cardNameInput.validity.valid && cardLinkInput.validity.valid) {
    renderCard(
      { name: cardNameInput.value, link: cardLinkInput.value },
      cardsContainer
    );
    closeModal(addCardModal);
  }
});
