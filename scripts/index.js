// -------------------- TARJETAS INICIALES --------------------
const initialCards = [
  { name: "Latemar", link: "./images/latemar.jpg" },
  { name: "Montañas Calvas", link: "./images/montanas_calvas.jpg" },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/vanois_national_park.jpg",
  },
  { name: "Valle de Yosemite", link: "./images/yosemite.jpg" },
];

// -------------------- FUNCIONES MODAL --------------------
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) closeModal(evt.target);
}
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) closeModal(openPopup);
  }
}
document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.addEventListener("mousedown", handleOverlayClick));
document.addEventListener("keydown", handleEscClose);

// -------------------- EDITAR PERFIL --------------------
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

enableValidation([nameInput, descriptionInput], saveButton);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetForm([nameInput, descriptionInput], saveButton);
  openModal(editModal);
});

closeEditButton.addEventListener("click", () => closeModal(editModal));

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editModal);
});

// -------------------- NUEVO LUGAR --------------------
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.getElementById("new-card-popup");
const closeAddCardButton = addCardModal.querySelector(".popup__close");
const newCardForm = document.getElementById("new-card-form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const createButton = newCardForm.querySelector(".popup__button");

enableValidation([cardNameInput, cardLinkInput], createButton);

addCardButton.addEventListener("click", () => {
  resetForm([cardNameInput, cardLinkInput], createButton);
  openModal(addCardModal);
});
closeAddCardButton.addEventListener("click", () => closeModal(addCardModal));

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    cardsContainer
  );
  closeModal(addCardModal);
});

// -------------------- TARJETAS DINÁMICAS --------------------
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function getCardElement({ name, link }) {
  const card = cardTemplate.cloneNode(true);
  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");

  img.src = link;
  img.alt = name;
  title.textContent = name;

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_is-active")
  );

  img.addEventListener("click", () => {
    document.querySelector(".popup__image").src = link;
    document.querySelector(".popup__image").alt = name;
    document.querySelector(".popup__caption").textContent = name;
    openModal(document.getElementById("image-popup"));
  });

  return card;
}

function renderCard(data, container) {
  const card = getCardElement(data);
  container.prepend(card);
}

initialCards.forEach((card) => renderCard(card, cardsContainer));

// Eliminar tarjeta
cardsContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__delete-button")) {
    evt.target.closest(".card").remove();
  }
});
