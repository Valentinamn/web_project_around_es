// Array de tarjetas iniciales
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

// Comprobación
initialCards.forEach((card) => console.log(card.name));

// -------------------- Modal Perfil --------------------

// Selección de elementos
const editProfileButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeModalButton = editModal.querySelector(".popup__close");

// Campos de la página
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Campos del formulario dentro del modal
const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description"
);

// Funciones reutilizables
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Función para rellenar el formulario
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Función para abrir modal y rellenar formulario
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

// Event listeners
editProfileButton.addEventListener("click", handleOpenEditModal);
closeModalButton.addEventListener("click", () => closeModal(editModal));

// Selección del formulario dentro del modal
const editProfileForm = document.getElementById("edit-profile-form");

// Función para manejar el submit del formulario
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Evita que el formulario se recargue

  // Actualizamos los campos de la página con los valores del formulario
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  // Cerramos el modal
  closeModal(editModal);
}

// Event listener para el submit del formulario
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
