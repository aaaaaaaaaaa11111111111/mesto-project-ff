import { putLike, deleteLike } from './api.js'

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (el, userId, handleDeleteCard, openImageModal, like) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardItem.querySelector('.card__title');
    const cardImage = cardItem.querySelector('.card__image');
    const deleteButton = cardItem.querySelector('.card__delete-button');
    const likeCounter = cardItem.querySelector('.card__like-counter');
    const likeButton = cardItem.querySelector('.card__like-button');

    cardTitle.textContent = el.name;
    cardItem.querySelector('.card__image').setAttribute('src', el.link);
    cardItem.querySelector('.card__image').setAttribute('alt', `${el.name} фотография`);
    
    cardImage.addEventListener('click', () =>  openImageModal(el));
    likeButton.addEventListener('click', () => like(likeButton, el._id, likeCounter));

    if (el.likes.length > 0) {
        likeCounter.textContent = el.likes.length
    } else {
        likeCounter.textContent = '0';
    }

    if (el.likes.some((like) => like._id === userId)) {
        likeButton.classList.toggle('card__like-button_is-active');
    }

    if (el.owner._id === userId) {
        deleteButton.addEventListener('click', () => {
            handleDeleteCard(el, cardItem); 
        });
    } else {
        deleteButton.remove();
    }

    return cardItem;
};

export function like (likeButton, cardId, likeCounter) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? deleteLike(cardId) : putLike(cardId);
    likeMethod
    .then((cardId) => {
        likeCounter.textContent = cardId.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
        console.log(err);
    })
};