// Abrir popup
export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

// Cerrar popup
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Cerrar popup con Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) closeModal(openPopup);
  }
}

// Agregar listeners a overlays y botones de cierre
export function setOverlayListeners() {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    // Cerrar al hacer clic en la X
    const closeButton = popup.querySelector(".popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => closeModal(popup));
    }

    // Cerrar al hacer clic fuera del contenido
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });
}
