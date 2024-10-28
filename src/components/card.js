import { deleteCard, putLike, deleteLike } from './api.js'
const cardTemplate = document.querySelector('#card-template').content;

export function createCard (el, userId, handleDeleteCard, openImageModal, likeCard) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardItem.querySelector('.card__title');
    const cardImage = cardItem.querySelector('.card__image');
    const deleteButton = cardItem.querySelector('.card__delete-button');
    const likeCounter = cardItem.querySelector('.card__like-counter');

    cardTitle.textContent = el.name;
    cardItem.querySelector('.card__image').setAttribute('src', el.link);
    cardItem.querySelector('.card__image').setAttribute('alt', `${el.name} фотография`);
    cardImage.addEventListener('click', () =>  openImageModal(el));
    cardItem.addEventListener('click', likeCard);
    
    if (el.likes.length > 0) {
        likeCounter.textContent = el.likes.length
    }

    if (el.owner._id === userId) {
        deleteButton.addEventListener('click', () => {
            handleDeleteCard(el, cardItem); 
        });
    } else {
        deleteButton.remove()
    }

    return cardItem;
};

export function handleDeleteCard (cardId, cardItem) {
    deleteCard(cardId._id)
    .then(() =>{
        cardItem.remove(); 
    })
};

export function likeCard (evt) { 
    if (evt.target.classList.contains('card__like-button')) { 
        evt.target.classList.toggle('card__like-button_is-active');
    };
};