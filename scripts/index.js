import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, setOverlayListeners } from "./utils.js";

// -------------------- Configuración de validación --------------------
const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
};

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

// -------------------- Popup Imagen --------------------
const imageModal = document.getElementById("image-popup");
const imageModalImg = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

function handleCardClick(name, link) {
  imageModalImg.src = link;
  imageModalImg.alt = name;
  imageModalCaption.textContent = name;
  openModal(imageModal);
}

// -------------------- Renderizar tarjetas --------------------
const cardsContainer = document.querySelector(".cards__list");

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.generateCard();
}

initialCards.forEach((item) => {
  cardsContainer.prepend(createCard(item));
});

// -------------------- Editar Perfil --------------------
const editProfileButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const editForm = document.querySelector("#edit-profile-form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const descInput = editForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descInput.value = profileDescription.textContent;
  editValidator.resetValidation();
  openModal(editModal);
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descInput.value;
  closeModal(editModal);
});

// -------------------- Nueva Tarjeta --------------------
const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const titleInput = newCardForm.querySelector(".popup__input_type_card-name");
const linkInput = newCardForm.querySelector(".popup__input_type_url");

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  openModal(newCardModal);
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCard = createCard({
    name: titleInput.value,
    link: linkInput.value,
  });

  cardsContainer.prepend(newCard);
  closeModal(newCardModal);
});

// -------------------- Validación --------------------
const editValidator = new FormValidator(config, editForm);
const newCardValidator = new FormValidator(config, newCardForm);

editValidator.enableValidation();
newCardValidator.enableValidation();

// -------------------- Overlays --------------------
setOverlayListeners();
