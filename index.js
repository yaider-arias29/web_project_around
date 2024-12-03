import card from "./cards.js";
import formValidator from "./formValidator.js";
import {initialCards, 
  openPopupProfile, 
  closePopupProfile,
  openPopupCards,
  closePopupCards,
  openPopupImage,
  closePopupImage
} from "./utils.js";
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
const formCard = document.querySelector("#form__add");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__ocupation");
const inputName = document.querySelector("#input-name");
const inputAbout = document.querySelector("#input-about");
const inputTitle = document.querySelector("#input-title");
const inputPlace = document.querySelector("#input-place");
const cardTemplate = document.querySelector(".elements__container").content;
const cardArea = document.querySelector(".elements");

initialCards.forEach(function (item) {
const newCard = new card(item.name, item.link);
cardArea.append(newCard.getCards());
});

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  buttonElement: ".form__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input-error",
  errorClass: "form__error_visible"
};

const validationProfileForm = new formValidator(formProfile, settings)
validationProfileForm.enableValidation();

const validationProfileCard = new formValidator(formCard, settings)
validationProfileCard.enableValidation();

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







