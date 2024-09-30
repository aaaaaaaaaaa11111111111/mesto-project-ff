import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js'
import { openModal, closeModal } from './components/modal.js';

const cardContainer = document.querySelector('.places__list');

function appendCards (cardContainer, cardItem) {
    cardContainer.append(cardItem);
};

initialCards.forEach(function(el) {
    appendCards(cardContainer, createCard(el, deleteCard, openImageModal, likeCard));
});

const editButton = document.querySelector('.profile__edit-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const profileName = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 
editButton.addEventListener('click', () => { 
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent; 
    openModal(popupEdit); 
}); 
 
const addButton = document.querySelector('.profile__add-button'); 
const popupAdd = document.querySelector('.popup_type_new-card'); 
addButton.addEventListener('click', () => { 
    openModal(popupAdd); 
}); 

const closePopupButton = document.querySelectorAll('.popup__close'); 
closePopupButton.forEach(el => { 
    el.addEventListener('click', () => { 
        closeModal(popupEdit); 
        closeModal(popupAdd);
        closeModal(popupTypeImage);
    }); 
});

const formElement = document.forms['edit-profile'];

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEdit)
};

formElement.addEventListener('submit', handleFormSubmit);


const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openImageModal (el) {
    popupImage.src = el.link
    popupImage.alt = el.name
    popupCaption.textContent = el.name
    openModal(popupTypeImage)
};
