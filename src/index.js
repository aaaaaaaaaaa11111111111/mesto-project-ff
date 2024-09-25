import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard } from './components/card.js'
import { openModal } from './components/modal.js';

const cardContainer = document.querySelector('.places__list');

function appendCards (cardContainer, cardItem) {
    cardContainer.append(cardItem);
};

initialCards.forEach(function(el) {
    appendCards(cardContainer, createCard(el.name, el.link, deleteCard));
});

const editButton = document.querySelector('.profile__edit-button');
const popupEditModal = document.querySelector('.popup_type_edit')
editButton.addEventListener('click', () => {
    openModal(popupEditModal)
});
