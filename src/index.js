import './pages/index.css';
import { createCard, like } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getUserInfo, patchUserInfo, postCard, deleteCard, patchAvatar } from './components/api.js';

const cardContainer = document.querySelector('.places__list');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const formElementEdit = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const profileImage = document.querySelector('.profile__image');
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const formElementCard = document.forms['new-place'];
const closePopupButton = document.querySelectorAll('.popup__close');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formElementAvatar = document.forms['avatar'];
const avatarLinkInput = document.querySelector('#input_avatar-url');
const popupConfirm = document.querySelector('.popup_type_delete_confirm');
const formElementConfirm = document.forms['confirm'];

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let userId = "";
let deleteElement = {};

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`
        profileName.textContent = userInfo.name
        profileDescription.textContent = userInfo.about
        userId = userInfo._id
        renderCards(initialCards);
});

const renderCards = (cards) => {
    cards.forEach((el) => {
        const newCard = createCard(el, userId, handleDeleteCard, openImageModal, like);
        cardContainer.append(newCard);
    })
};

function openImageModal (el) {
    popupImage.src = el.link;
    popupImage.alt = el.name;
    popupCaption.textContent = el.name;
    openModal(popupTypeImage);
};

closePopupButton.forEach(el => {
    const modal = el.closest('.popup');
    el.addEventListener('click', () => {
        closeModal(modal);
    });
});

function handleDeleteCard (el, cardItem) {
    openModal(popupConfirm);
    deleteElement = {id: el._id, item: cardItem};
    return deleteElement;
};

function handleFormSubmitDeleteConfirmation (evt) {
    evt.preventDefault();
    const button = popupConfirm.querySelector('.popup__button');
    button.textContent = 'Удаление...';
    deleteCard(deleteElement.id, deleteElement.item)
    .then(() =>{
        deleteElement.item.remove(); 
    })
    .then(() => {
        closeModal(popupConfirm);
    })
    .finally(() => {
        button.textContent = 'Да';
    })
    .catch((err) => {
        console.log(err);
    })
};

buttonOpenEditProfileForm.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formElementEdit, validationConfig);
    openModal(popupEdit);
});

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    const button = popupEdit.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
    patchUserInfo(nameInput.value, jobInput.value)
    .then(res => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(popupEdit);
        formElementEdit.reset();
        clearValidation(formElementEdit, validationConfig);
    })
    .finally (() => {
        button.textContent = 'Сохранить';
    })
};

buttonOpenAddCardForm.addEventListener('click', () => { 
    clearValidation(formElementCard, validationConfig);
    openModal(popupAdd);
});

function handleFormSubmitCard (evt) {
    evt.preventDefault();
    const cardNameInput = popupAdd.querySelector('.popup__input_type_card-name');
    const cardLinkInput = popupAdd.querySelector('.popup__input_type_url');
    const button = popupAdd.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
    postCard(cardNameInput.value, cardLinkInput.value)
    .then((res) => {
        const newCard = createCard(res, userId, handleDeleteCard, openImageModal, like);
        cardContainer.prepend(newCard);
        closeModal(popupAdd);
        formElementCard.reset();
        clearValidation(formElementCard, validationConfig);
    })
    .finally (() => {
        button.textContent = 'Сохранить';
    })
};

profileImage.addEventListener('click', () => {
    openModal(popupAvatar);
    clearValidation(formElementAvatar, validationConfig);
});

function handleFormSubmitAvatar (evt) {
    evt.preventDefault();
    const imageUrl = avatarLinkInput.value;
    const button = popupAvatar.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
    patchAvatar(imageUrl)
    .then (res => {
        profileImage.style.backgroundImage = `url('${res.avatar}')`;
        closeModal(popupAvatar);
        formElementAvatar.reset();
        clearValidation(formElementAvatar, validationConfig);
    })
    .finally (() => {
        button.textContent = 'Сохранить';
    })
};

formElementEdit.addEventListener('submit', handleFormSubmitProfile);

formElementCard.addEventListener('submit', handleFormSubmitCard);

formElementAvatar.addEventListener('submit', handleFormSubmitAvatar);

formElementConfirm.addEventListener('submit', handleFormSubmitDeleteConfirmation);

enableValidation(validationConfig);