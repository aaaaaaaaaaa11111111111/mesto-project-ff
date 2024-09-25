const cardTemplate = document.querySelector('#card-template').content;

export function createCard (name, link, deleteCard) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardItem.querySelector('.card__title');
    cardTitle.textContent = name;
    cardItem.querySelector('.card__image').setAttribute('src', link);
    cardItem.querySelector('.card__image').setAttribute('alt', `${name} фотография`);
    cardItem.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardItem));

    return cardItem;
};

export function deleteCard (cardItem) {
    cardItem.remove();
};