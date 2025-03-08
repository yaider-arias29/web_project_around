import popup from "./popup.js";

export default class PopupWhitImage extends popup{
constructor(popupSelector){
    super(popupSelector)
this.imageElement = this.popupElement.querySelector(".popup__image-place")
this.titleElement = this.popupElement.querySelector(".popup__image-title")
   }
   open(name, link){
   this.titleElement.textContent = name
   this.imageElement.src = link
   super.open()
   }
}