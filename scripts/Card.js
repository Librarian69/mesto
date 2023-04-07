import {initialCards} from '../scripts/constants.js';
import {popupImageTitle, popupImage, openPopup, cardsGridList} from '../scripts/index.js';

class Card {
  constructor(data, templateCard, templateOpen) {
    this._name = data.name;
    this._link = data.link;
    this._templateCard = templateCard;
    this._templateOpen = templateOpen;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateCard)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__photo').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__button-like').addEventListener('click', () => {
      this._setLikeCardClick();
    });

    this._element.querySelector('.card__button-delete').addEventListener('click', () => {
      this._deletCard();
    });

    this._element.querySelector('.card__photo').addEventListener('click', () => {
      this._openPopupImage();
    });
  }  
  
  _setLikeCardClick() {
    this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
  }

  _deletCard() {
    this._element.remove();
  }

  _openPopupImage() {
    const popupElement = document.querySelector('.popup_card-photo');
    popupImageTitle.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
    this._templateOpen(popupElement);
  }

}

initialCards.forEach(function(item) { 
  const card = new Card(item, '.template-photo-card', openPopup);
  const cardElement = card.generateCard();

  document.querySelector('.cards-grid__list').append(cardElement);
});

function addNewCard(name, link) {
  const card = new Card({name, link}, '.template-photo-card', openPopup);
  const cardElement = card.generateCard();

  cardsGridList.prepend(cardElement);
}

export {addNewCard};