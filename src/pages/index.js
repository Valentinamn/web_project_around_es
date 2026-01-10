// -------------------- IMPORTACIONES --------------------
import { api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForms.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

// -------------------- SELECTORES --------------------
const profileSelectors = {
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
};

const cardsContainerSelector = ".cards__list";
const cardTemplateSelector = "#card-template";

// Formularios
const editProfileForm = document.getElementById("edit-profile-form");
const newCardForm = document.getElementById("new-card-form");
const avatarForm = document.getElementById("avatar-form");

// Botones
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image");

// -------------------- VARIABLES --------------------
let currentUserId = null;

// -------------------- INSTANCIAS --------------------

// Usuario
const userInfo = new UserInfo(profileSelectors);

// Popup imagen
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// Confirmación eliminar tarjeta
const confirmDeletePopup = new PopupWithConfirmation("#confirm-popup");
confirmDeletePopup.setEventListeners();

// Sección de tarjetas
const cardsSection = new Section(
  {
    items: [],
    renderer: (cardData) => createCard(cardData),
  },
  cardsContainerSelector
);

// -------------------- FUNCIONES --------------------

// Crear tarjeta
function createCard(data) {
  const card = new Card(
    {
      ...data,
      isLiked: data.likes?.some((like) => like._id === currentUserId) || false,
      currentUserId: currentUserId,
    },
    cardTemplateSelector,
    (name, link) => imagePopup.open(name, link),
    handleDeleteCard,
    handleLikeCard
  );

  return card.generateCard();
}

// Manejo de likes
function handleLikeCard(cardInstance) {
  const method = cardInstance._isLiked
    ? api.unlikeCard(cardInstance._data._id)
    : api.likeCard(cardInstance._data._id);

  method
    .then((updatedCard) => {
      cardInstance.updateLikes(updatedCard.likes || [], currentUserId);
    })
    .catch((err) => console.log("Error al actualizar like:", err));
}

// Manejo de eliminar tarjeta
function handleDeleteCard(cardInstance) {
  confirmDeletePopup.open();
  confirmDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(cardInstance._data._id)
      .then(() => {
        cardInstance.remove();
        confirmDeletePopup.close();
      })
      .catch((err) => console.log("Error al eliminar tarjeta:", err));
  });
}

// -------------------- POPUPS --------------------

// Editar perfil
const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
  const btn = editProfileForm.querySelector("button");
  const originalText = btn.textContent;
  btn.textContent = "Guardando...";

  api
    .updateUserInfo({ name: data.name, about: data.description })
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, about: res.about });
      editProfilePopup.close();
    })
    .catch(console.log)
    .finally(() => (btn.textContent = originalText));
});
editProfilePopup.setEventListeners();

// Nueva tarjeta
const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  const btn = newCardForm.querySelector("button");
  const originalText = btn.textContent;
  btn.textContent = "Guardando...";

  api
    .addCard({ name: data["place-name"], link: data["link"] })
    .then((card) => {
      cardsSection.addItem(createCard(card), true);
      newCardPopup.close();
      newCardForm.reset();
    })
    .catch(console.log)
    .finally(() => (btn.textContent = originalText));
});
newCardPopup.setEventListeners();

// Cambiar avatar
const avatarPopupInstance = new PopupWithForm("#avatar-popup", (data) => {
  const btn = avatarForm.querySelector("button");
  const originalText = btn.textContent;
  btn.textContent = "Guardando...";

  api
    .updateUserAvatar({ avatar: data.avatar })
    .then((res) => {
      document.querySelector(profileSelectors.avatarSelector).src = res.avatar;
      avatarPopupInstance.close();
    })
    .catch(console.log)
    .finally(() => (btn.textContent = originalText));
});
avatarPopupInstance.setEventListeners();

// -------------------- VALIDADORES --------------------
const formConfig = {
  inputSelector: ".popup_input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup_input_type_error",
};

const editProfileValidator = new FormValidator(formConfig, editProfileForm);
editProfileValidator.enableValidation();

const newCardValidator = new FormValidator(formConfig, newCardForm);
newCardValidator.enableValidation();

const avatarValidator = new FormValidator(formConfig, avatarForm);
avatarValidator.enableValidation();

// -------------------- EVENTOS --------------------
editButton.addEventListener("click", () => {
  const currentData = userInfo.getUserInfo();
  editProfilePopup.setInputValues({
    name: currentData.name,
    description: currentData.about,
  });
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

avatarButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopupInstance.open();
});

// -------------------- CARGAR DATOS INICIALES --------------------
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    // Forzar nombre "Valentina Montoya"
    userInfo.setUserInfo({
      name: "Valentina Montoya",
      about: userData.about,
    });

    document.querySelector(profileSelectors.avatarSelector).src =
      userData.avatar;

    // Renderizar todas las tarjetas
    cardsSection.setItems(cards);
    cardsSection.renderItems();
  })
  .catch(console.log);
