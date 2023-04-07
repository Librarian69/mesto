class FormValidator {
  constructor(form, validationConfig) {
    this.form = form;
    this.validationConfig = validationConfig;
    this.inputList = Array.from(this.form.querySelectorAll(this.validationConfig.inputSelector));
    this.submitButton = this.form.querySelector(this.validationConfig.submitButtonSelector);
  }

  _showInputError(input) {
    const errorTextElement = input.parentElement.querySelector(`${this.validationConfig.errorClassInput}${input.name}`); 
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(this.validationConfig.activeErrorsClass);
  }

  _hideInputError(input) {
    const errorTextElement = input.parentElement.querySelector(`${this.validationConfig.errorClassInput}${input.name}`); 
    errorTextElement.classList.remove(this.validationConfig.activeErrorsClass);
    errorTextElement.textContent = '';
  }

  _showColorBorder(input) {
    input.classList.add(this.validationConfig.colorInputBorderError);
  }

  _hideColorBorder(input) {
    input.classList.remove(this.validationConfig.colorInputBorderError);
  }

  _disableButton() {
    this.submitButton.classList.add(this.validationConfig.inactiveButtonClass);
    this.submitButton.disabled = true;
  }

  _enableButton() {
    this.submitButton.classList.remove(this.validationConfig.inactiveButtonClass);
    this.submitButton.disabled = false;
  }

  _checkInputValidity(input) {
    if (!input.checkValidity()) {
      this._showInputError(input);
      this._showColorBorder(input);
    } else {
      this._hideInputError(input);
      this._hideColorBorder(input);
    }
  }

  _checkFormValidity() {
    if (!this.form.checkValidity()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this.inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._checkFormValidity();
      });
    });
    this._checkFormValidity();
  }

  resetForm() {
    this.inputList.forEach((input) => {
      this._hideInputError(input);
      this._hideColorBorder(input);
    });
    this._checkFormValidity();
  }
}

function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => {
    const formValidator = new FormValidator(form, validationConfig);
    formValidator.setEventListeners();
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  errorClassInput: '.popup__input-error_type_',
  activeErrorsClass: 'popup__input-error_active',
  colorInputBorderError: 'popup__input_border-color'
};

function resetValidation(form, validationConfig) {
  const formValidator = new FormValidator(form, validationConfig);
  formValidator.resetForm();
}

export {validationConfig, enableValidation, resetValidation};