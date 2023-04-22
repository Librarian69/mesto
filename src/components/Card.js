class Card {
  constructor(data, templateCard, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__photo');
    this._likeButton = this._element.querySelector('.card__button-like');
    this._deleteButton = this._element.querySelector('.card__button-delete');
    this._popupElement = document.querySelector('.popup_card-photo');
    this._popupImageTitle = this._popupElement.querySelector('.popup__photo-title');
    this._popupImage = this._popupElement.querySelector('.popup__photo-image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._setEventListeners();
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
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._setLikeCardClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setLikeCardClick() {
    this._likeButton.classList.toggle('card__button-like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
}

export {Card};