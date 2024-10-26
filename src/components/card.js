import { deleteCard, putLike, deleteLike } from './api.js'
const cardTemplate = document.querySelector('#card-template').content;

export function createCard (el, userId, handleDeleteCard, openImageModal, likeCard) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardItem.querySelector('.card__title');
    const cardImage = cardItem.querySelector('.card__image');
    const deleteButton = cardItem.querySelector('.card__delete-button');
    cardTitle.textContent = el.name;
    cardItem.querySelector('.card__image').setAttribute('src', el.link);
    cardItem.querySelector('.card__image').setAttribute('alt', `${el.name} фотография`);
    cardImage.addEventListener('click', () =>  openImageModal(el));
    cardItem.addEventListener('click', likeCard);
    // cardItem.querySelector('.card__delete-button').addEventListener('click', () => handleDeleteCard(cardItem));
    if (el._id === userId) {
        deleteButton.addEventListener('click', () => {
            handleDeleteCard(el._id, cardItem); 
        });
    } else {
        deleteButton.remove()
    }

    return cardItem;
};

export function handleDeleteCard (cardId, cardItem) {
    deleteCard(cardId)
    .then(() =>{
        cardItem.remove(); 
    })
};

export function likeCard (evt) { 
    if (evt.target.classList.contains('card__like-button')) { 
        evt.target.classList.toggle('card__like-button_is-active');
    };
};