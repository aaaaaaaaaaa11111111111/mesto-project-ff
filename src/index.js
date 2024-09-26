import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard } from './components/card.js'
import { openModal, closeModal } from './components/modal.js';

const cardContainer = document.querySelector('.places__list');

function appendCards (cardContainer, cardItem) {
    cardContainer.append(cardItem);
};

initialCards.forEach(function(el) {
    appendCards(cardContainer, createCard(el.name, el.link, deleteCard));
});

const editButton = document.querySelector('.profile__edit-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const profileName = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const popupNameInput = document.querySelector('.popup__input_type_name'); 
const popupDescriptionInput = document.querySelector('.popup__input_type_description'); 
editButton.addEventListener('click', () => { 
    popupNameInput.value = profileName.textContent; 
    popupDescriptionInput.value = profileDescription.textContent; 
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
    }); 
});