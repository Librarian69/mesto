const showInputError = (input, errorClassInput, activeErrorsClass) => {
  const errorTextElement = input.parentElement.querySelector(`${errorClassInput}${input.name}`); 
  errorTextElement.textContent = input.validationMessage;
  errorTextElement.classList.add(activeErrorsClass);
}

const hideInputError = (input, errorClassInput, activeErrorsClass) => {
  const errorTextElement = input.parentElement.querySelector(`${errorClassInput}${input.name}`); 
  errorTextElement.classList.remove(activeErrorsClass);
  errorTextElement.textContent = '';
}

const showColorBorder = (input, colorInputBorderError) => {
  input.classList.add(colorInputBorderError);
}

const hideColorBorder = (input, colorInputBorderError) => {
  input.classList.remove(colorInputBorderError);
}

const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

const checkInputValidity = (input, errorClassInput, activeErrorsClass, colorInputBorderError) => {
  if (!input.checkValidity()) {
    showInputError(input, errorClassInput, activeErrorsClass);
    showColorBorder(input, colorInputBorderError);
  } else {
    hideInputError(input, errorClassInput, activeErrorsClass);
    hideColorBorder(input, colorInputBorderError);
  }
}

const checkFormValidity = (form, submitButton, inactiveButtonClass) => {
  if (!form.checkValidity()) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
};

const setEventListeners = (form, inputList, { errorClassInput, activeErrorsClass, inactiveButtonClass, colorInputBorderError }, submitButton) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(input, errorClassInput, activeErrorsClass, colorInputBorderError);
      checkFormValidity(form, submitButton, inactiveButtonClass);
    });
  });
  checkFormValidity(form, submitButton, inactiveButtonClass);
};

function enableValidation({ formSelector, inputSelector, submitButtonSelector, ...config }) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    const inputList = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);

    setEventListeners(form, inputList, config, submitButton);
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
}



function resetValidation(form,  validationConfig) {
  const inputList = form.querySelectorAll( validationConfig.inputSelector);
  const submitButton = form.querySelector( validationConfig.submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(input,  validationConfig.errorClassInput,  validationConfig.activeErrorsClass);
    hideColorBorder(input,  validationConfig.colorInputBorderError);
  });
  
  checkFormValidity(form, submitButton, validationConfig.inactiveButtonClass);
}

enableValidation(validationConfig);