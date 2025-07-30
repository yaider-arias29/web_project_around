const cardTemplate = document.querySelector(".elements__container");
export default class Card {
  constructor(name, link, handleClickImage, handleLikeClick, handleDeleteClick, cardId, likes, userId, ownerId) {
    this.name = name;
    this.link = link;
    this.handleClickImage = handleClickImage;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardId = cardId; 
    this._likes = likes;   
    this._userId = userId; 
    this._isLiked = Array.isArray(this._likes) && this._likes.some(like => like._id === this._userId);
    this.ownerId = ownerId;
  }

getTemplate() {
    return cardTemplate.cloneNode(true).content.querySelector(".elements__cards");
  }

  toggleLike() {
    this.cardLikeButton.classList.toggle("elements__icon-active");
  }

  removeCard() {
    this.htmlCard.remove();
  }

  setEvenListeners() { 
    this.cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._isLiked, this.cardLikeButton);
      this._isLiked = !this._isLiked; 
      this.toggleLike(); 
    });

    this.cardRemoveButton.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId, this.htmlCard); 
    });

    this.cardImage.addEventListener("click", () => {
      this.handleClickImage();
    });
  }

  setProperties() {
    this.htmlCard = this.getTemplate();
    this.cardImage = this.htmlCard.querySelector(".elements__image");
    this.cardTitle = this.htmlCard.querySelector(".elements__title");
    this.cardLikeButton = this.htmlCard.querySelector(".elements__icon");
    this.cardRemoveButton = this.htmlCard.querySelector(".elements__remove");

    this.cardTitle.textContent = this.name;
    this.cardImage.src = this.link;
    this.cardImage.alt = `Imagen de ${this.name}`; 

    if (this._isLiked) {
      this.cardLikeButton.classList.add("elements__icon-active");
    }

    if (this.ownerId && this._userId !== this.ownerId) {
this.cardRemoveButton.style.display = 'none'; 
} else {
this.cardRemoveButton.style.display = ''; 
}}

  getCards() {
    this.setProperties();
    this.setEvenListeners(); 
    return this.htmlCard;
  }
};
