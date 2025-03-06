import card from "./cards.js";
import formValidator from "./formValidator.js";
import {initialCards,  
  closePopupProfile,
  closePopupCards,
  closePopupImage,
  openPopupCards,
  openPopupImage,
  openPopupProfile
} from "./utils.js";
import popupWhitForm from "./PopupWithForm.js";
import popupWhitImage from "./popupWhitImage.js";


const profileButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add");
const popupClosed = document.querySelector("#popup__button-edit");
const popupAddClosed = document.querySelector("#popup__button-add");
const popupImageClosed = document.querySelector("#popup__image-button");
const formProfile = document.querySelector("#form-profile");
const formCard = document.querySelector("#form-add");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__ocupation");
const inputName = document.querySelector("#input-name");
const inputAbout = document.querySelector("#input-about");
const inputTitle = document.querySelector("#input-title");
const inputPlace = document.querySelector("#input-place");
const cardArea = document.querySelector(".elements");
const popupProfile = new popupWhitForm("#popup__edit");
const popupCards = new popupWhitForm("#popup__add");
const popupImage = new popupWhitImage("#popup__image");
//popupImage.open();
popupProfile.setEventListeners();
popupCards.setEventListeners();
popupImage.setEventListeners();


initialCards.forEach(function (item) {
const newCard = new card(item.name, item.link, () => {
popupImage.open(item.name, item.link)
});
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

profileButton.addEventListener("click", () =>{
  popupProfile.open()
});
profileAddButton.addEventListener("click", () =>{
  popupCards.open()
});
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







