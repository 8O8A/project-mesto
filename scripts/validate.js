const showInputError = function(formElement, inputElement, errorMessage) {      //(formElement) - это <fieldset> , (inputElement) - это <input>
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input-error');   //красное подчеркивание
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__span-error_active'); //сообщение об ошибке
};

const hideInputError = function(formElement, inputElement) {           //(formElement) - это <fieldset> , (inputElement) - это <input>
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('popup__span-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = function(formElement, inputElement) {    //(formElement) - это <fieldset> , (inputElement) - это <input>
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);     //(formElement) - это <fieldset> , (inputElement) - это <input>
    } else {
      hideInputError(formElement, inputElement);     //(formElement) - это <fieldset> , (inputElement) - это <input>
    }
  };

const hasInvalidInput = function(inputList) {       //(inputList) - это всё что внутри <fieldset class="popup__form-table">
    return inputList.some(function(inputElement) {  //проходим массив пока не найдём не корректный инпут
      return !inputElement.validity.valid;
    })
  };

  //функция отключения кнопки отправки формы
function buttonDisable(buttonElement) {
    buttonElement.setAttribute('disabled', true);
  };

  //функция активыции кнопки отправки формы
function buttonActive(buttonElement) {
    buttonElement.removeAttribute('disabled');
  };

const toggleButtonState = function(inputList, buttonElement) {  //(inputList, buttonElement) - это константы из const setEventListeners
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save-button_inactive');
        buttonDisable(buttonElement);
        // buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove('popup__save-button_inactive');
        buttonActive(buttonElement);
        // buttonElement.removeAttribute('disabled')
    }
};


const setEventListeners = function(formElement) {             //(formElement) - это всё что внутри <fieldset class="popup__form-table">
    const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));     //(formElement) - это всё что внутри <fieldset class="popup__form-table">
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach(function(inputElement) {                //(inputElement) - сюда попадает каждый <input class="popup__input-field> при переборе его массива
        inputElement.addEventListener('input', function() {   //(inputElement) - сюда попадает каждый <input class="popup__input-field> при переборе его массива
            checkInputValidity(formElement, inputElement);    //(formElement) - это <fieldset> , (inputElement) - это <input>
            toggleButtonState(inputList, buttonElement);
        });
    });
};


const enableValidation = function() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(function(formElement) {
        const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-table'));
        fieldsetList.forEach(function(fieldset) {  //(fieldset) - сюда попадает каждый <fieldset class="popup__form-table"> при переборе его массива
            setEventListeners(fieldset);            //(fieldset) - это всё что внутри <fieldset class="popup__form-table">
        });
    });
};

enableValidation();

// function enableValidation(args) {
    
// }

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__save-button',
//     inactiveButtonClass: 'popup__save-button_disabled',
//     inputErrorClass: 'popup__input-error',
//     errorClass: 'popup__span-error_active'
//   });
