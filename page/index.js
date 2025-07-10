import card from "./components/cards.js";
import formValidator from "./components/formValidator.js";
import {initialCards,  
  closePopupProfile,
  closePopupCards,
  closePopupImage,
  openPopupCards,
  openPopupImage,
  openPopupProfile
} from "./components/utils.js";
import popupWhitForm from "./components/PopupWithForm.js";
import popupWhitImage from "./components/popupWhitImage.js";
import Api from "./components/Api.js";


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

api.getUserInfo() 
  .then((userData) => {
    document.querySelector('.profile__name').textContent = userData.name;
    document.querySelector('.profile__ocupation').textContent = userData.about;
    document.querySelector('.profile__image').src = userData.avatar;
  })
function handleProfileEditSubmit(newName, newAbout) {
  const submitButton = document.querySelector('.profile__edit');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Guardando...';
}
  api.updateUserInfo({ name: newName, about: newAbout })
    .then(updatedUser => {
      console.log('Perfil actualizado:', updatedUser);
      document.querySelector('.profile__name').textContent = updatedUser.name;
      document.querySelector('.profile__ocupation').textContent = updatedUser.about;
    })
    .catch(err => {
      console.error('Error al actualizar el perfil:', err);
    })

    function handleAddCardSubmit(cardName, cardLink) {
  const submitButton = document.querySelector('.form__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Guardando...';

  api.addCard({ name: cardName, link: cardLink })
    .then(newCard => {
      console.log('Nueva tarjeta añadida:', newCard);
    })
    .catch(err => {
      console.error('Error al añadir la tarjeta:', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

function handleDeleteIconClick(cardId, cardElement) {
    api.deleteCard(cardId)
      .then(() => {
        console.log('Tarjeta eliminada exitosamente:', cardId);
        cardElement.remove();
      })
      .catch(err => {
        console.error('Error al eliminar la tarjeta:', err);
      });
}

function handleLikeButtonClick(cardId, isLiked, likeButtonElement) {
  api.changeLikeCardStatus(cardId, !isLiked) 
    .then(updatedCard => {
      console.log('Estado del like actualizado:', updatedCard);
    })
    .catch(err => {
      console.error('Error al cambiar el estado del like:', err);
    });
}

function handleAvatarUpdateSubmit(newAvatarLink) {
  const submitButton = document.querySelector('.avatar-update-form__submit-button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Guardando...';

  api.updateAvatar(newAvatarLink)
    .then(updatedUser => {
      console.log('Avatar actualizado:', updatedUser);
      document.querySelector('.profile__avatar').src = updatedUser.avatar;
    })
    .catch(err => {
      console.error('Error al actualizar el avatar:', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}//

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
