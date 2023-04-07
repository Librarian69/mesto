import {validationConfig, enableValidation, resetValidation} from './FormValidator.js';
import {addNewCard} from '../scripts/Card.js';

const page = document.querySelector('.page');
const buttonEdit = document.querySelector('.profile__button-edit');
const popupProfile = document.querySelector('.popup_edit');
const formProfileEdit = document.querySelector('.popup__form_edit-profile');
const popupFormAddPhoto = document.querySelector('.popup__form_add-photo');
const buttonCloseEditProfile = document.querySelector('.popup__button-close_edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const popupInfo = document.querySelector('.popup__input_type_info');
const appellationInput = document.querySelector('.popup__input_type_appellation');
const linkInput = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonSave = document.querySelector('.popup__button-save');
const cardsGridList = document.querySelector('.cards-grid__list');
const templatePhotoCard = document.querySelector('.template-photo-card').content;
const profileButtonAdd = document.querySelector('.profile__button-add');
const popupAddPhoto = document.querySelector('.popup_add-photo');
const popupButtonCloseAddPhoto = document.querySelector('.popup__button-close_add-photo');
const popupCardPhoto = document.querySelector('.popup_card-photo');
const popupButtonClosePhoto = document.querySelector('.popup__button-close_photo');
const popupImageTitle = document.querySelector('.popup__photo-title');
const popupActive = document.querySelector('.popup_active');
const profileIinputList = [nameInput, popupInfo];
const PhotoIinputList = [appellationInput, linkInput];
const format = document.querySelector('.popup__form');
const popupImage = popupCardPhoto.querySelector('.popup__photo');

function closePressingEsc(evt) {
  if (evt.key === 'Escape') {
      const popupElement = document.querySelector('.popup_active');
      if (popupElement) {
          closePopup(popupElement);
      }
  }
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_active');
  removeEscListener();
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
  addEscListener();
}

function removeEscListener() {
  document.removeEventListener('keydown', closePressingEsc);
}

function addEscListener() {
  document.addEventListener('keydown', closePressingEsc);
}

function closeOverlayPopup(popupElement, evt) {
  if (evt.target.classList.contains('popup_active')) {
    closePopup(popupElement);
  }
}

popupButtonClosePhoto.addEventListener('click', function () {
  closePopup(popupCardPhoto);
});

popupCardPhoto.addEventListener('mousedown', function(evt) { 
  closeOverlayPopup(popupCardPhoto, evt);
});

popupProfile.addEventListener('mousedown', function(evt) { 
  closeOverlayPopup(popupProfile, evt);
});

buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  popupInfo.value = profileDescription.textContent;
  resetValidation(formProfileEdit, validationConfig);
});

buttonCloseEditProfile.addEventListener('click', function() {
  closePopup(popupProfile);
  
  removeEscListener(popupProfile);
});

function fillProfileFormFields() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = popupInfo.value;
}

function submitProfileForm (evt) {
  evt.preventDefault();

  fillProfileFormFields();
  closePopup(popupProfile);
}

formProfileEdit.addEventListener('submit', submitProfileForm);

profileButtonAdd.addEventListener('click', function () {
  openPopup(popupAddPhoto);
  popupFormAddPhoto.reset();
  resetValidation(popupFormAddPhoto, validationConfig);
}); 

popupButtonCloseAddPhoto.addEventListener('click', function () {
  closePopup(popupAddPhoto);  
});

popupAddPhoto.addEventListener('mousedown', function(evt) { 
  closeOverlayPopup(popupAddPhoto, evt);
});

function submitPhotoForm (evt) {
  evt.preventDefault();
  addNewCard(appellationInput.value, linkInput.value);
  popupFormAddPhoto.reset();
  closePopup(popupAddPhoto);
}

popupFormAddPhoto.addEventListener('submit', submitPhotoForm);

enableValidation(validationConfig);

export {popupImageTitle, popupImage, popupCardPhoto, openPopup, cardsGridList};