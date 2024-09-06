const profileButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add");
const popupProfile = document.querySelector("#popup__edit");
const popupCards = document.querySelector("#popup__add");
const popupImage = document.querySelector("#popup__image");
const popupImagePlace = document.querySelector(".popup__image-place");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupClosed = document.querySelector("#popup__button-edit");
const popupAddClosed = document.querySelector("#popup__button-add");
const popupImageClosed = document.querySelector("#popup__image-button");
const formProfile = document.querySelector(".form");
const formCard = document.querySelector(".form-add");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__ocupation");
const inputName = document.querySelector("#input-name");
const inputAbout = document.querySelector("#input-about");
const inputTitle = document.querySelector("#input-title");
const inputPlace = document.querySelector("#input-place");
const cardTemplate = document.querySelector(".elements__container").content;
const cardArea = document.querySelector(".elements");
const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    },
  ];

function createCard (name, link) {
    const card = cardTemplate.querySelector(".elements__cards").cloneNode(true);
    const cardImage = card.querySelector(".elements__image");
    const cardTitle = card.querySelector(".elements__title");
    const cardLikeButton = card.querySelector(".elements__icon");
    const cardRemoveButton = card.querySelector(".elements__remove");
    cardRemoveButton.addEventListener("click", function() {
      card.remove()
    });
    cardLikeButton.addEventListener("click", function() {
      cardLikeButton.classList.toggle("elements__icon-active");
    });
    cardImage.addEventListener("click", function () {
      openPopupImage(name, link);
    });
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    return card;
}

initialCards.forEach(function (item) {
const newCard = createCard(item.name, item.link);
cardArea.append(newCard);
});

function openPopupProfile() {
    popupProfile.classList.add("popup_opened");
}

function closePopupProfile() {
    popupProfile.classList.remove("popup_opened");
}

function openPopupCards() {
    popupCards.classList.add("popup_opened");
}

function closePopupCards() {
    popupCards.classList.remove("popup_opened");
}

function openPopupImage(title, link) {
  popupImage.classList.add("popup_opened");
  popupImageTitle.textContent = title;
  popupImagePlace.src = link;
}

function closePopupImage() {
  popupImage.classList.remove("popup_opened");
}

profileButton.addEventListener("click", openPopupProfile);
profileAddButton.addEventListener("click", openPopupCards);
popupAddClosed.addEventListener("click", closePopupCards);
popupClosed.addEventListener("click", closePopupProfile);
popupImageClosed.addEventListener("click", closePopupImage);

formProfile.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopupProfile();
});

formCard.addEventListener("submit", function (evt) {
    evt.preventDefault();

const newCard = createCard(inputTitle.value, inputPlace.value);
cardArea.prepend(newCard);
    closePopupCards();
});


