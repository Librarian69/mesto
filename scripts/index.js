let buttonEdit = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let buttonClose = document.querySelector('.popup__button-close');
let nameInput = document.querySelector('.popup__input_type_name');
let popupInfo = document.querySelector('.popup__input_type_info');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let buttonSave = document.querySelector('.popup__button-save');


buttonEdit.addEventListener('click', function() {
  popup.classList.add('popup_active');
  nameInput.value = profileName.textContent;
  popupInfo.value = profileDescription.textContent;
});


buttonClose.addEventListener('click', function() {
  popup.classList.remove('popup_active');
});


function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = popupInfo.value;
  popup.classList.remove("popup_active");
}

formElement.addEventListener('submit', handleFormSubmit);

