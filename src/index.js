import './pages/index.css';
import { createCard, handleDeleteCard, like } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getUserInfo, patchUserInfo, postCard, patchAvatar } from './components/api.js';

const cardContainer = document.querySelector('.places__list');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const profileName = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const closePopupButton = document.querySelectorAll('.popup__close');
const formElementEdit = document.forms['edit-profile'];
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const formElementCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

let userId = "";
let cards = [];

function handleFormSubmit(evt) {
    evt.preventDefault();
    patchUserInfo(nameInput.value, jobInput.value)
    .then(res => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
    })
    closeModal(popupEdit);
    clearValidation(popupEdit, validationConfig);
};

function openImageModal (el) {
    popupImage.src = el.link;
    popupImage.alt = el.name;
    popupCaption.textContent = el.name;
    openModal(popupTypeImage);
};

function handleFormSubmitCard (evt) {
    evt.preventDefault();
    postCard(cardNameInput.value, cardLinkInput.value)
    .then((el) => {
        const newCard = createCard (el, userId, handleDeleteCard, openImageModal, like);
        cardContainer.prepend(newCard);
    })
    closeModal(popupAdd);
    formElementCard.reset();
    clearValidation(popupAdd, validationConfig);
};

buttonOpenEditProfileForm.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formElementEdit, validationConfig);
    openModal(popupEdit);
});

buttonOpenAddCardForm.addEventListener('click', () => { 
    clearValidation(formElementCard, validationConfig);
    openModal(popupAdd);
});

closePopupButton.forEach(el => {
    const modal = el.closest('.popup');
    el.addEventListener('click', () => {
        closeModal(modal);
    });
});

formElementEdit.addEventListener('submit', handleFormSubmit);

formElementCard.addEventListener('submit', handleFormSubmitCard);

enableValidation(validationConfig);

const profileImage = document.querySelector('.profile__image');

const renderCards = () => {
    cards.forEach((el) => {
        const newCard = createCard (el, userId, handleDeleteCard, openImageModal, like);
        cardContainer.append(newCard);
    })
};

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`
        profileName.textContent = userInfo.name
        profileDescription.textContent = userInfo.about
        userId = userInfo._id
        cards = initialCards
        renderCards();
});

const popupAvatar = document.querySelector('.popup_type_avatar');
const formElementAvatar = document.forms['avatar'];
const avatarLinkInput = document.querySelector('#input_avatar-url')

profileImage.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(popupAvatar);
    clearValidation(formElementAvatar, validationConfig);
});

function handleFormSubmitAvatar (evt) {
    evt.preventDefault();
    const imageUrl = avatarLinkInput.value;
    patchAvatar(imageUrl)
    .then (res => {
        profileImage.style.backgroundImage = `url('${res.avatar}')`;
    })
    closeModal(popupAvatar);
    formElementAvatar.reset();
    clearValidation(formElementAvatar, validationConfig);
}

formElementAvatar.addEventListener('submit', handleFormSubmitAvatar);