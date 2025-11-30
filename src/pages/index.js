import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForms.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { openModal, closeModal, setOverlayListeners } from "../utils.js";

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

// -------------------- Instancias de popups --------------------
const imagePopup = new PopupWithImage("#image-popup");
const editPopup = new PopupWithForm("#edit-popup", (data) => {
  userInfo.setUserInfo(data);
});
const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  const newCard = createCard(data);
  section.addItem(newCard);
});

// -------------------- UserInfo --------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// -------------------- Crear Card --------------------
function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
}

// -------------------- Renderizar tarjetas con Section --------------------
const section = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
section.renderItems();

// -------------------- Botones --------------------
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Editar perfil
editProfileButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  editPopup.setInputValues(data);
  editPopup.open();
});

// Agregar nueva tarjeta
addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// -------------------- Validación --------------------
const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const editValidator = new FormValidator(config, editForm);
const newCardValidator = new FormValidator(config, newCardForm);

editValidator.enableValidation();
newCardValidator.enableValidation();

// -------------------- Overlays --------------------
setOverlayListeners();
