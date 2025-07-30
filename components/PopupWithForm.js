import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector); 
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button'); 
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll('.popup__input'); 
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners(); 

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._handleFormSubmit(this._getInputValues());
      
    });
  }

  close() {
    super.close();
    this._form.reset(); 
  }
}