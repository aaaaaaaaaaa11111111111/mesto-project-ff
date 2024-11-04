import './pages/index.css';
import { createCard, handleDeleteCard, like } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getUserInfo, patchUserInfo, postCard, patchAvatar } from './components/api.js';

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

let userId = "";
let cards = [];

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`
        profileName.textContent = userInfo.name
        profileDescription.textContent = userInfo.about
        userId = userInfo._id
        cards = initialCards
        renderCards();
});

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

const renderCards = () => {
    cards.forEach((el) => {
        const newCard = createCard(el, userId, handleDeleteCard, openImageModal, like);
        cardContainer.append(newCard);
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

profileImage.addEventListener('click', (evt) => {
    evt.preventDefault();
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

enableValidation(validationConfig);