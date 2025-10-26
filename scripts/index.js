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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

editProfileButton.addEventListener("click", handleOpenEditModal);
closeEditButton.addEventListener("click", () => closeModal(editModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editModal);
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// -------------------- Tarjetas dinámicas --------------------
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

// Modal imagen grande
const imageModal = document.getElementById("image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImg = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

function openImageModal(name, link) {
  imageModalImg.src = link;
  imageModalImg.alt = name;
  imageModalCaption.textContent = name;
  openModal(imageModal);
}

imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));

function getCardElement({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  // Asignar datos
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Botón me gusta
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // Abrir modal imagen al hacer click
  cardImage.addEventListener("click", () => openImageModal(name, link));

  return cardElement;
}

// Renderizar tarjetas
function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

// Renderizar inicial
initialCards.forEach((card) => renderCard(card, cardsContainer));

// Eliminar tarjetas (delegación)
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

function handleOpenAddCardModal() {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openModal(addCardModal);
}
addCardButton.addEventListener("click", handleOpenAddCardModal);
closeAddCardButton.addEventListener("click", () => closeModal(addCardModal));

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderCard(newCard, cardsContainer);
  closeModal(addCardModal);
}
newCardForm.addEventListener("submit", handleCardFormSubmit);
