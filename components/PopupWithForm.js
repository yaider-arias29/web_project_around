import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector); // Llama al constructor de la clase padre (Popup)
      this._handleFormSubmit = handleFormSubmit; // Función que se ejecutará al enviar el formulario
      this._inputs = Array.from(document.querySelectorAll(".form__input"));
      this._form = document.querySelector(".form") // Obtiene los inputs del formulario
    }
  
    open(formType) { // Nuevo método para abrir el popup y especificar el tipo de formulario
      this._form.dataset.formType = formType; // Almacena el tipo de formulario en un atributo data
      super.open(); // Llama al método open de la clase padre para mostrar el popup
    }
  
    setEventListeners() {
      super.setEventListeners(); // Llama al método setEventListeners de la clase padre
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault(); // Evita el comportamiento por defecto del formulario
        const values = this._getInputValues(); // Obtiene los valores de los inputs
        const formType = this._form.dataset.formType; // Obtiene el tipo de formulario
  
        if (this._isValid(formType)) { // Valida el formulario antes de enviarlo
          this._handleFormSubmit(values, formType); // Llama a la función de submit con los valores y el tipo de formulario
          this.close(); // Cierra el popup después de enviar el formulario
        }
      });
    }
  
    _getInputValues() {
      const values = {};
      this._inputs.forEach(input => {
        values[input.name] = input.value;
      });
      return values;
    }
  
    _isValid(formType) {
      let isValid = true;
      this._inputs.forEach(input => {
        const errorElement = this._form.querySelector(`#${input.id}-error`); // Obtiene el elemento de error para este input
        if (!input.validity.valid) {
          errorElement.textContent = input.validationMessage; // Muestra el mensaje de error
          isValid = false;
        } else {
          errorElement.textContent = ''; // Limpia el mensaje de error
        }
      });
      return isValid;
    }
  
    close() {
      super.close(); // Llama al método close de la clase padre
      this._form.reset(); // Resetea el formulario
    }
  }