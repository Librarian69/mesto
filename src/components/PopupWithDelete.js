import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor({ selector, deleteCardApi }) {
    super({ selector });
    this._deleteCardApi = deleteCardApi;
    this._form = this._popup.querySelector(".form_type_delete");
  }

  setData(data, deleteCard) {
    this._data = data;
    this._deleteCard = deleteCard;
  }

  getData() {
    return {
      data: this._data,
      deleteCard: this._deleteCard,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteCardApi();
    });
  }
}
