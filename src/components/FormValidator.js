export default class FormValidator {
  constructor(config, validatedForm) {
    (this._inputSelector = config.inputSelector),
      (this._submitButtonSelector = config.submitButtonSelector),
      (this._submitButtonSelectorDisable = config.submitButtonSelectorDisable),
      (this._inputErrorClass = config.inputErrorClass),
      (this._errorClass = config.errorClass),
      (this._formElem = validatedForm),
      (this._inputArray = Array.from(
        validatedForm.querySelectorAll(this._inputSelector)
      )),
      (this._submitBtn = this._formElem.querySelector(
        this._submitButtonSelector
      ));
  }

  _hasInvalidInput() {
    return this._inputArray.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.classList.add(this._submitButtonSelectorDisable);
      this._submitBtn.setAttribute("disabled", true);
    } else {
      this._submitBtn.classList.remove(this._submitButtonSelectorDisable);
      this._submitBtn.removeAttribute("disabled");
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElem.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElem.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputArray.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }


  _setListeners() {
    this._toggleButtonState();
    this._formElem.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });

    this._inputArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidator() {
    this._setListeners();
  }
}
