let buttonEdit = document.querySelector('.profile__button-edit'); 
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let buttonClose = document.querySelector('.popup__button-close');
let nameInput = document.querySelector('.popup__input_type_name');
let popupInfo = document.querySelector('.popup__input_type_info');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let buttonSave = document.querySelector('.popup__button-save');
let buttonLike = document.querySelectorAll('.cards-grid__button-like');
let buttonLikeActive = document.querySelector('.cards-grid__button-like_active');


buttonEdit.addEventListener('click', function() {
  popup.classList.remove('popup_disabled');
  nameInput.value = profileName.textContent;
  popupInfo.value = profileDescription.textContent;
});


buttonClose.addEventListener('click', function() {
  popup.classList.add('popup_disabled');
});

buttonSave.addEventListener("click", function () {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = popupInfo.value;
  popup.classList.add("popup_disabled");
});

function handleFormSubmit (evt) {
  evt.preventDefault();

  nameInput.value = profileName.textContent;
  popupInfo.value = profileDescription.textContent;
}

formElement.addEventListener('submit', handleFormSubmit);

for (let i = 0; i < buttonLike.length; i++) {
  buttonLike[i].addEventListener("click", function () {
    buttonLike[i].classList.toggle('cards-grid__button-like_active');
  });
}