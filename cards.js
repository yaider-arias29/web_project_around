const cardTemplate = document.querySelector(".elements__container");
export default class card {
constructor(name, link){
this.name = name,
this.link = link
}

getTemplate() {
    return cardTemplate.cloneNode(true).content.querySelector(".elements__cards")
}

toggleLike() {
    this.cardLikeButton.classList.toggle("elements__icon-active")
}

removeCard() {
    this.htmlCard.remove();
}

setEvenListeners() {
this.cardLikeButton.addEventListener("click", () => {
this.toggleLike();
});
this.cardRemoveButton.addEventListener("click", () => {
    this.removeCard();
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
  }

  getCards() {
    this.setProperties();
    this.setEvenListeners();
    return this.htmlCard;
  }
}
