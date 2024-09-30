const cardTemplate = document.querySelector('#card-template').content;

export function createCard (el, deleteCard, openImageModal) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardItem.querySelector('.card__title');
    const cardImage = cardItem.querySelector('.card__image')
    cardTitle.textContent = el.name;
    cardItem.querySelector('.card__image').setAttribute('src', el.link);
    cardItem.querySelector('.card__image').setAttribute('alt', `${el.name} фотография`);
    cardItem.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardItem));
    cardImage.addEventListener('click', () =>  openImageModal(el));
    cardItem.addEventListener('click', likeCard);
        
    return cardItem;
};

export function deleteCard (cardItem) {
    cardItem.remove();
};

export function likeCard (evt) { 
    if (evt.target.classList.contains('card__like-button')) { 
        evt.target.classList.toggle('card__like-button_is-active') 
    } 
};