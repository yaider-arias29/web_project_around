import Popup from './popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form_type_confirm');
    this._submitButton = this._form ? this._form.querySelector('.popup__button_type_confirm') : null;

    if (!this._form) {
      console.error(`PopupWithConfirmation: Formulario no encontrado con selector '.popup__form_type_confirm' en ${popupSelector}`);
    }
    if (!this._submitButton) {
      console.error(`PopupWithConfirmation: Botón de submit no encontrado con selector '.popup__button_type_confirm'`);
    }
    this._originalButtonText = this._submitButton ? this._submitButton.textContent : 'Sí'; // Guarda el texto original
  }

  setSubmitAction(action) {
    this._handleConfirmSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    if (this._form) {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log('Evento submit del formulario de confirmación disparado.');
        if (this._handleConfirmSubmit) {
          this._handleConfirmSubmit();
        } else {
          console.warn('PopupWithConfirmation: _handleConfirmSubmit no está definido.');
        }
      });
    }
  }

  // ¡AÑADE ESTE MÉTODO!
  renderLoading(isLoading, loadingText = 'Eliminando...') {
    if (this._submitButton) { // Asegúrate de que el botón exista
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = this._originalButtonText; // Restaura al texto original
      }
    }
  }

  close() {
    super.close();
    // Opcional: Asegúrate de restaurar el texto del botón cuando se cierre el popup
    this.renderLoading(false);
  }
}