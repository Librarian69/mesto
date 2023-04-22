class FormValidator {
  constructor(form, validationConfig) {
    this.form = form;
    this.validationConfig = validationConfig;
    this._inputList = Array.from(this.form.querySelectorAll(this.validationConfig.inputSelector));
    this._submitButton = this.form.querySelector(this.validationConfig.submitButtonSelector);
  }

  _showError(input) {
    const errorTextElement = this.form.querySelector(`.${this.validationConfig.errorClassInput}${input.name}`); 
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(this.validationConfig.activeErrorsClass);
    input.classList.add(this.validationConfig.colorInputBorderError);
  }

  _hideError(input) {
    const errorTextElement = this.form.querySelector(`.${this.validationConfig.errorClassInput}${input.name}`); 
    errorTextElement.classList.remove(this.validationConfig.activeErrorsClass);
    errorTextElement.textContent = '';
    input.classList.remove(this.validationConfig.colorInputBorderError);
  }

  _toggleButtonState() {
    if (this.form.checkValidity()) {
      this._submitButton.classList.remove(this.validationConfig.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this.validationConfig.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this._hideError(input);
    });
  }
}

const formValidators = {}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  errorClassInput: 'popup__input-error_type_',
  activeErrorsClass: 'popup__input-error_active',
  colorInputBorderError: 'popup__input_border-color'
};

export {validationConfig, formValidators, FormValidator};