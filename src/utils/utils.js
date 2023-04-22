import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {validationConfig, formValidators, FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card';
import {cardsSection} from '../pages/index.js'

function openPopup(popupSelector) {
  const popup = new Popup(popupSelector);
  popup.open();
  popup.setEventListeners();
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.setEventListeners();
  });
};

function resetFormValidation(formName) {
  const formValidator = formValidators[formName];
    formValidator.resetValidation();
}

function addNewCard(name, link) {
  const card = new Card({ name, link }, '.template-photo-card', handleCardClick);
  const cardElement = card.generateCard();
  cardsSection.addItem(cardElement);
}

function handleCardClick(name, link) {
  const popup = new PopupWithImage('.popup_card-photo');
  popup.open({ src: link, alt: name });
}

export {openPopup, enableValidation, resetFormValidation, addNewCard, handleCardClick};