const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

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

function closePopup(popupElement) {
  popupElement.classList.remove('popup_active');
  
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
}

function closeOverlayPopup(popupElement, evt) {
  if (evt.target.classList.contains('popup_active')) {
    closePopup(popupElement);
  }
}

function resetFormValidationOverlay(evt, target, form, config) {
  if (evt.target === target) {
    resetValidation(form, config);
  }
}




function closePressingEsc(evt, popupElement) {
  if (evt.key === 'Escape') {
    closePopup(popupElement);
    const form = popupElement.querySelector('form');
    if (form) {
      enableValidation(validationConfig, form);
    }
    removeEscListener(popupElement);
  }
}

function addEscListener(popupElement, validationConfig) {
  document.addEventListener('keydown', (evt) => closePressingEsc(evt, popupElement, validationConfig));
}


function removeEscListener(popupElement) {
  document.removeEventListener('keydown', (evt) => closePressingEsc(evt, popupElement));
  const form = popupElement.querySelector('form');
  if (form) {
    resetValidation(form, validationConfig);
  }
}

function createCard(name, link) {
  const cardElement = templatePhotoCard.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__photo').alt = name;

  setLikeCardListener(cardElement);
  setCardDeletListener(cardElement);
  setPopupImageOpenListener(cardElement);

  return cardElement;
}

function renderCard(cardsGridList, initialCardElement) {
  cardsGridList.append(initialCardElement);
} 

function prependCard(cardsGridList, newCardElement) {
  cardsGridList.prepend(newCardElement);
}

function addNewCard() {
  const newCardElement = createCard(appellationInput.value, linkInput.value);
  prependCard(cardsGridList, newCardElement)
}

initialCards.forEach(function(element) {
  const initialCardElement = createCard(element.name, element.link);
  renderCard(cardsGridList, initialCardElement)
});



function setLikeCardListener(cardElement) {
  const likeButton = cardElement.querySelector('.card__button-like');
  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('card__button-like_active');
  });
}

function setCardDeletListener(cardElement) {
  const buttonDelete = cardElement.querySelector('.card__button-delete');

  buttonDelete.addEventListener('click', function () {
    const cardDelet = buttonDelete.closest('.card');
    cardDelet.remove();
  }); 
}

function setPopupImageOpenListener(element) {    
  const cardPhoto = element.querySelector('.card__photo');
  const cardTitle = element.querySelector('.card__title');
  
  cardPhoto.addEventListener('click', function () {
    const popupImage = document.querySelector('.popup__photo');
    popupImage.setAttribute('src', cardPhoto.src);
    popupImage.setAttribute('alt', cardPhoto.alt);
        
    popupImageTitle.textContent = cardTitle.textContent; 
    openPopup(popupCardPhoto);
    addEscListener(popupCardPhoto);
  });
}

popupButtonClosePhoto.addEventListener('click', function () {
  closePopup(popupCardPhoto);
  removeEscListener(popupCardPhoto);
});

popupCardPhoto.addEventListener('mousedown', function(evt) { 
  closeOverlayPopup(popupCardPhoto, evt);
});



popupProfile.addEventListener('mousedown', function(evt) { 
  closeOverlayPopup(popupProfile, evt);
  resetFormValidationOverlay(evt, popupProfile, formProfileEdit, validationConfig); 
});

buttonEdit.addEventListener('click', function() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  popupInfo.value = profileDescription.textContent;

  addEscListener(popupProfile);
  enableValidation(validationConfig, formProfileEdit)
  
});

buttonCloseEditProfile.addEventListener('click', function() {
  closePopup(popupProfile);
  resetValidation(formProfileEdit, validationConfig);
  removeEscListener(popupProfile);
});

function fillProfileFormFields() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = popupInfo.value;
}



function submitProfileForm (evt) {
  evt.preventDefault();

  enableValidation(validationConfig, formProfileEdit);
  fillProfileFormFields();
  closePopup(popupProfile);
}

formProfileEdit.addEventListener('submit', submitProfileForm);



profileButtonAdd.addEventListener('click', function () {
  openPopup(popupAddPhoto);
  addEscListener(popupAddPhoto);
  enableValidation(validationConfig, popupFormAddPhoto);
}); 

popupButtonCloseAddPhoto.addEventListener('click', function () {
  resetValidation(popupFormAddPhoto, validationConfig);
  removeEscListener(popupAddPhoto);
  closePopup(popupAddPhoto);  
});

popupAddPhoto.addEventListener('mousedown', function(evt) { 
  closeOverlayPopup(popupAddPhoto, evt);
  resetFormValidationOverlay(evt, popupAddPhoto, popupFormAddPhoto, validationConfig);
});



function submitPhotoForm (evt) {
  evt.preventDefault();
  addNewCard();
  enableValidation(validationConfig, popupFormAddPhoto);
  popupFormAddPhoto.reset();
  closePopup(popupAddPhoto);
}

popupFormAddPhoto.addEventListener('submit', submitPhotoForm);