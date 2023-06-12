import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleSubmitForm }) {
    super({ selector });
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._btn = this._form.querySelector(".popup__button-save");
    this._btnText = this._btn.textContent;
  }

  _getInputValues() {
    const formData = {};
    this._inputList.forEach((inputElement) => {
      formData[inputElement.name] = inputElement.value;
    });
    return formData;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }

  showLoading(state) {
    if (state) {
      this._btn.textContent = "Сохранение ...";
    } else {
      this._btn.textContent = this._btnText;
    }
  }
}
