import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); 
this._imageElement = this._popupElement.querySelector('.popup__image-place');
this._imageTitle = this._popupElement.querySelector('.popup__image-title');
  }

  open(name, link) {
   
    this._imageElement.src = link;
    this._imageElement.alt = name; 
    this._imageTitle.textContent = name; 

    super.open(); 
  }
}