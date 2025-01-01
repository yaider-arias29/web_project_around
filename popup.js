export default class Popup{
    constructor(popupSelector){
        this.popupElement = document.querySelector(popupSelector);
        this.closeButton = this.popupElement.querySelector(".popup__closed");
        this._handleEsClose = this._handleEsClose.bind(this)
    }
    open(){
        console.log(this.popupElement)
        this.popupElement.classList.add("popup_opened")
        document.addEventListener("keydown",this._handleEsClose)
        }
    close(){
        this.popupElement.classList.remove("popup_closed")
        document.removeEventListener("keydown",this._handleEsClose)
    }
    _handleEsClose(evt){
        if (evt.key === "Escape") {
            this.close();
        }
    }

    handleClickOutside(){
        return(evt.target.classlist.contains("popup_opened"))
    }

    setEventListeners(){
        this.closeButton.addEventListener("click", ()=>{
            this.close()
        })
        this.popupElement.addEventListener("click", ()=>{
            if(this.handleClickOutside(evt)){
                this.close();
            }
        })
    }
}