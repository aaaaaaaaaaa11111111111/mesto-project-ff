//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
//DOM узлы
const cardContainer = document.querySelector('.places__list');
//Функция создания карточки
function createCard (name, link, deleteCard) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardItem.querySelector('.card__title');
    cardTitle.textContent = name;
    cardItem.querySelector('.card__image').setAttribute('src', link);
    cardItem.querySelector('.card__image').setAttribute('alt', `${name} фотография`);
    cardItem.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardItem));

    return cardItem;
};
//Функция удаления карточки
function deleteCard (cardItem) {
    cardItem.remove();
};
//карточки на страницу
function appendCards (cardContainer, cardItem) {
    cardContainer.append(cardItem);
};

initialCards.forEach(function(el) {
    appendCards(cardContainer, createCard(el.name, el.link, deleteCard));
});