const buttonEdit = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup_edit');
const formElement = document.querySelector('.popup__form');
const popupFormAddPhoto = document.querySelector('.popup__form_add-photo');
const buttonClose = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.popup__input_type_name');
const popupInfo = document.querySelector('.popup__input_type_info');
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


function closePopup(popupElement) {
  popupElement.classList.remove('popup_active');
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
}

function likeActive(cardElement) {
  const likeButton = cardElement.querySelector('.card__button-like');
  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('card__button-like_active');
  });
}

function cardDelet(cardElement) {
  const buttonDelete = cardElement.querySelector('.card__button-delete');

  buttonDelete.addEventListener('click', function () {
    const cardDelet = buttonDelete.closest('.card');
    cardDelet.remove();
  }); 
}

function openImagePopup(element) {    
  const cardPhoto = element.querySelector('.card__photo');
  const cardTitle = element.querySelector('.card__title');
  const popupImageTitle = document.querySelector('.popup__photo-title');

  cardPhoto.addEventListener('click', function () {
    const popupImage = document.querySelector('.popup__photo');
    popupImage.setAttribute('src', cardPhoto.src);
    popupImage.setAttribute('alt', cardPhoto.alt);
        
    popupImageTitle.textContent = cardTitle.textContent; 
    openPopup(popupCardPhoto);
  });
}

buttonEdit.addEventListener('click', function() {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  popupInfo.value = profileDescription.textContent;
});


buttonClose.addEventListener('click', function() {
  closePopup(popup);
});

function newName() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = popupInfo.value;
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  newName();

  closePopup(popup);
}

formElement.addEventListener('submit', handleFormSubmit);


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

initialCards.forEach(function(element) {
  const initialCardElement = templatePhotoCard.cloneNode(true);
  initialCardElement.querySelector('.card__title').textContent = element.name;
  initialCardElement.querySelector('.card__photo').src = element.link;
  initialCardElement.querySelector('.card__photo').alt = element.name;

  likeActive(initialCardElement);
  cardDelet(initialCardElement);
  openImagePopup(initialCardElement);
  cardsGridList.append(initialCardElement);
});

profileButtonAdd.addEventListener('click', function () {
  openPopup(popupAddPhoto);
}); 

popupButtonCloseAddPhoto.addEventListener('click', function () {
  closePopup(popupAddPhoto);
}); 

popupButtonClosePhoto.addEventListener('click', function () {
  closePopup(popupCardPhoto);
});

function addNewCard() {
  const appellationInput = document.querySelector('.popup__input_type_appellation');
  const linkInput = document.querySelector('.popup__input_type_link');
  
  const newCard = {
    name: appellationInput.value,
    link: linkInput.value
  };

  const newCardElement = templatePhotoCard.cloneNode(true);
  newCardElement.querySelector('.card__title').textContent = newCard.name;
  newCardElement.querySelector('.card__photo').src = newCard.link;
  newCardElement.querySelector('.card__photo').alt = newCard.name;

  likeActive(newCardElement);
  cardDelet(newCardElement);
  openImagePopup(newCardElement)
  cardsGridList.prepend(newCardElement);  
}


function photoFormSubmit (evt) {
  evt.preventDefault();

  addNewCard();
  closePopup(popupAddPhoto);
}

popupFormAddPhoto.addEventListener('submit', photoFormSubmit);
