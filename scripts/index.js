// -------------------- Tarjetas iniciales --------------------
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
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

// Funciones reutilizables
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Rellenar formulario con datos de la página
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Abrir modal de editar perfil
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

// Event listeners editar perfil
editProfileButton.addEventListener("click", handleOpenEditModal);
closeEditButton.addEventListener("click", () => closeModal(editModal));

// Guardar cambios del perfil
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

// Función para manejar clic en botón "Me gusta"
function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Función para abrir modal de imagen grande
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

// Cerrar modal de imagen
imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));

// Función para crear un elemento de tarjeta
function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
} = {}) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Asignar datos
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Event listener para botón Me gusta
  likeButton.addEventListener("click", handleLikeButtonClick);

  // Event listener para eliminar tarjeta
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Event listener para abrir modal de imagen grande
  cardImage.addEventListener("click", () => {
    openImageModal(name, link);
  });

  return cardElement;
}

// Renderizar tarjeta
function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

// Renderizar todas las tarjetas iniciales
initialCards.forEach((card) => renderCard(card, cardsContainer));

// -------------------- Modal Agregar tarjeta --------------------
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.getElementById("new-card-popup");
const closeAddCardButton = addCardModal.querySelector(".popup__close");

const newCardForm = document.getElementById("new-card-form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// Abrir modal agregar tarjeta
function handleOpenAddCardModal() {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openModal(addCardModal);
}
addCardButton.addEventListener("click", handleOpenAddCardModal);
closeAddCardButton.addEventListener("click", () => closeModal(addCardModal));

// Guardar nueva tarjeta
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
