import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';

const cardContainer = document.querySelector('.places__list');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const profileName = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const closePopupButton = document.querySelectorAll('.popup__close');
const formElementEdit = document.forms['edit-profile'];
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const formElementCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

function appendCards (cardContainer, cardItem) {
    cardContainer.append(cardItem);
};

initialCards.forEach(function(el) {
    appendCards(cardContainer, createCard(el, deleteCard, openImageModal, likeCard));
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEdit);
};

function openImageModal (el) {
    popupImage.src = el.link;
    popupImage.alt = el.name;
    popupCaption.textContent = el.name;
    openModal(popupTypeImage);
};

function handleFormSubmitCard (evt) {
    evt.preventDefault();
    const newCardElement = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
      };
    const newCard = createCard (newCardElement, deleteCard, openImageModal, likeCard);
    cardContainer.prepend(newCard);
    closeModal(popupAdd);
    formElementCard.reset();
};

buttonOpenEditProfileForm.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
    //clearValidation(formElementEdit, validationConfig);
});

buttonOpenAddCardForm.addEventListener('click', () => { 
    openModal(popupAdd);
});

closePopupButton.forEach(el => {
    const modal = el.closest('.popup');
    el.addEventListener('click', () => {
        closeModal(modal);
    });
});

formElementEdit.addEventListener('submit', handleFormSubmit);

formElementCard.addEventListener('submit', handleFormSubmitCard);

enableValidation(validationConfig);