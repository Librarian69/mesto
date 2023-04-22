import {initialCards, buttonEdit, profileButtonAdd, validationConfig} from '../utils/constants.js';
import {enableValidation, resetFormValidation, addNewCard, handleCardClick, createCard} from '../utils/utils.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import '../page/index.css';

export const popupClickImage = new PopupWithImage('.popup_card-photo');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
});

buttonEdit.addEventListener('click', function() {
popupProfileForm.open();
const currentUserInfo = userInfo.getUserInfo();
popupProfileForm.setInputValues(currentUserInfo);
resetFormValidation('editProfileForm');
});


const popupProfileForm = new PopupWithForm('.popup_edit', (formData) => {
  userInfo.setUserInfo(formData);
});

popupProfileForm.setEventListeners();

profileButtonAdd.addEventListener('click', function () {
  popupAddCard.open();
  resetFormValidation('addPhotoForm');
});

const popupAddCard = new PopupWithForm('.popup_add-photo', (formValues) => {
  addNewCard(formValues.name, formValues.link);
});

popupAddCard.setEventListeners();

export const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, handleCardClick);
    cardsSection.addItem(cardElement);
  }
}, 
'.cards-grid__list'
);

cardsSection.renderItems();

enableValidation(validationConfig);