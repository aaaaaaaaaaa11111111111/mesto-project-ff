export function openModal (popup) {
    popup.classList.add("popup_is-animated");
    setTimeout( function () {
        popup.classList.add('popup_is-opened');
    }, 1);
    document.addEventListener('keydown', modalCloseEsc);
    popup.addEventListener('click', modalCloseOverlay);
};

export function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', modalCloseEsc);
    popup.removeEventListener('click', modalCloseOverlay);
}

function modalCloseEsc (evt) {
    if (evt.key === 'Escape') {
        const activeModal = document.querySelector('.popup_is-opened');
        closeModal(activeModal)
    }
}

function modalCloseOverlay (evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.currentTarget);
    };
  };