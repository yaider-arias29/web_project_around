export default class formValidator {
    constructor(formElement, settings) {
    this.formElement = formElement,
    this.settings = settings
    }

    showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.settings.inputErrorClass);
        errorElement.textContent = errorMessage;
      };
    hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.settings.inputErrorClass);
        errorElement.textContent = "";
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage)
        }else{
            this.hideInputError(inputElement)

        }
    }
    toggleButtonSteate(buttonElement) {
        if (hasInvalidInput (inputList)) {
            buttonElement.classList.add(this.settings.inactiveButtonClass);
          } else {
            buttonElement.classList.remove(this.settings.inactiveButtonClass);
          }

    }
    setEventListeners(inputElement) {
        this.inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector))
        this.inputList.forEach((inputElement)=>{
            inputElement.addEventListener("input", ()=> {
                this.checkInputValidity(inputElement);
                this.toggleButtonSteate()
            })
        })
    }                  
    enableValidation() {
        this.formElement.addEventListener("submit", function(evt) {
     evt.prevendefault();
        });
        this.setEventListeners()
    }
}

