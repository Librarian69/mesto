import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__photo');
    this._popupImageTitle = this._popup.querySelector('.popup__photo-title');
    this.setEventListeners();
  }

  open({ src, alt }) {
    super.open();
    this._popupImage.src = src;
    this._popupImage.alt = alt;
    this._popupImageTitle.textContent = alt;
  }
  
}