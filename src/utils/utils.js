import FormValidator from '../components/FormValidator.js';
import {formValidators} from '../utils/constants.js';
import {Card} from '../components/Card';
import {cardsSection, popupClickImage} from '../pages/index.js';

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
  const cardElement = createCard({ name, link });
  cardsSection.addItem(cardElement);
}

function handleCardClick(name, link) {
  popupClickImage.open({ src: link, alt: name });
}

function createCard(item) {
  const card = new Card(item, '.template-photo-card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

export {enableValidation, resetFormValidation, addNewCard, handleCardClick, createCard};