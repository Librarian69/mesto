import {validationConfig, formValidators, FormValidator} from '../components/FormValidator.js';
import {initialCards, buttonEdit, nameInput, popupInfo, profileButtonAdd} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {openPopup, enableValidation, resetFormValidation, addNewCard, handleCardClick} from '../utils/utils.js'
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import '../page/index.css';

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
});

buttonEdit.addEventListener('click', function() {
openPopup('.popup_edit');
const currentUserInfo = userInfo.getUserInfo();
nameInput.value = currentUserInfo.name;
popupInfo.value = currentUserInfo.info;
resetFormValidation('editProfileForm');
});


const popupProfileForm = new PopupWithForm('.popup_edit', (formData) => {
  userInfo.setUserInfo(formData);
});

popupProfileForm.setEventListeners();

profileButtonAdd.addEventListener('click', function () {
  openPopup('.popup_add-photo');
  resetFormValidation('addPhotoForm');
});

const popupAddCard = new PopupWithForm('.popup_add-photo', (formValues) => {
  addNewCard(formValues.name, formValues.link);
});

popupAddCard.setEventListeners();

export const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-photo-card', handleCardClick);
    const cardElement = card.generateCard();
    cardsSection.addItem(cardElement);
  }
}, 
'.cards-grid__list'
);

cardsSection.renderItems();

enableValidation(validationConfig);