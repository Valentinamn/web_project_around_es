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
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Cerrar popup al hacer clic en superposición
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

// Cerrar popup con tecla Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) closeModal(openPopup);
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});
document.addEventListener("keydown", handleEscClose);

// -------------------- Modal Perfil --------------------
const editProfileButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeEditButton = editModal.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description"
);
const editProfileForm = document.getElementById("edit-profile-form");
const saveButton = editProfileForm.querySelector(".popup__button");

// Configuración HTML5
nameInput.required = true;
nameInput.minLength = 2;
nameInput.maxLength = 40;

descriptionInput.required = true;
descriptionInput.minLength = 2;
descriptionInput.maxLength = 200;

// Crear spans para mostrar errores
function createErrorSpan(input, className) {
  let span = input.parentNode.querySelector(`.${className}`);
  if (!span) {
    span = document.createElement("span");
    span.classList.add("popup__input-error", className);
    input.insertAdjacentElement("afterend", span);
  }
  return span;
}

const nameError = createErrorSpan(nameInput, "popup__input-error_name");
const descriptionError = createErrorSpan(
  descriptionInput,
  "popup__input-error_description"
);

// Mostrar mensaje de error
function showInputError(input, errorElement) {
  if (!input.validity.valid) {
    errorElement.textContent = input.validationMessage;
    input.classList.add("popup__input_type_error");
  } else {
    errorElement.textContent = "";
    input.classList.remove("popup__input_type_error");
  }
}

// Activar/desactivar botón
function toggleSaveButton() {
  const isValid = nameInput.validity.valid && descriptionInput.validity.valid;
  saveButton.disabled = !isValid;
  saveButton.classList.toggle("button_inactive", !isValid);
}

// Escuchar cambios en inputs
[nameInput, descriptionInput].forEach((input) => {
  input.addEventListener("input", () => {
    const errorElement = input === nameInput ? nameError : descriptionError;
    showInputError(input, errorElement);
    toggleSaveButton();
  });
});

// Resetear formulario
function resetForm(form, inputs) {
  inputs.forEach((input) => {
    input.classList.remove("popup__input_type_error");
    const error = input.parentNode.querySelector(".popup__input-error");
    if (error) error.textContent = "";
  });
  const button = form.querySelector(".popup__button");
  button.disabled = true;
  button.classList.add("button_inactive");
}

// Abrir popup Editar perfil
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetForm(editProfileForm, [nameInput, descriptionInput]);
  toggleSaveButton();
  openModal(editModal);
}

editProfileButton.addEventListener("click", handleOpenEditModal);
closeEditButton.addEventListener("click", () => closeModal(editModal));

// Enviar formulario
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  showInputError(nameInput, nameError);
  showInputError(descriptionInput, descriptionError);
  toggleSaveButton();
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

// Renderizar inicial
initialCards.forEach((card) => renderCard(card, cardsContainer));

// Eliminar tarjetas
cardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__delete-button")) {
    event.target.closest(".card").remove();
  }
});

// -------------------- Modal Agregar tarjeta --------------------
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.getElementById("new-card-popup");
const closeAddCardButton = addCardModal.querySelector(".popup__close");
const newCardForm = document.getElementById("new-card-form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const createButton = newCardForm.querySelector(".popup__button");

// Configuración HTML5
cardNameInput.required = true;
cardNameInput.minLength = 2;
cardNameInput.maxLength = 30;
cardLinkInput.required = true;
cardLinkInput.type = "url";

// Crear spans para errores
const titleError = createErrorSpan(cardNameInput, "popup__input-error_title");
const urlError = createErrorSpan(cardLinkInput, "popup__input-error_url");

// Mostrar error
function showNewCardError(input, errorElement) {
  if (!input.validity.valid) {
    errorElement.textContent = input.validationMessage;
    input.classList.add("popup__input_type_error");
  } else {
    errorElement.textContent = "";
    input.classList.remove("popup__input_type_error");
  }
}

// Activar/desactivar botón Crear
function toggleCreateButton() {
  const isValid = cardNameInput.validity.valid && cardLinkInput.validity.valid;
  createButton.disabled = !isValid;
  createButton.classList.toggle("button_inactive", !isValid);
}

// Escuchar cambios en inputs
[cardNameInput, cardLinkInput].forEach((input) => {
  input.addEventListener("input", () => {
    const errorElement = input === cardNameInput ? titleError : urlError;
    showNewCardError(input, errorElement);
    toggleCreateButton();
  });
});

// Abrir popup Nuevo Lugar
function handleOpenAddCardModal() {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  resetForm(newCardForm, [cardNameInput, cardLinkInput]);
  toggleCreateButton();
  openModal(addCardModal);
}

addCardButton.addEventListener("click", handleOpenAddCardModal);
closeAddCardButton.addEventListener("click", () => closeModal(addCardModal));

// Enviar formulario Nuevo Lugar
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  showNewCardError(cardNameInput, titleError);
  showNewCardError(cardLinkInput, urlError);
  toggleCreateButton();
  if (cardNameInput.validity.valid && cardLinkInput.validity.valid) {
    renderCard(
      { name: cardNameInput.value, link: cardLinkInput.value },
      cardsContainer
    );
    closeModal(addCardModal);
  }
});
