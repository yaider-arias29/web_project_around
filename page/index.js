import Card from "../components/cards.js";
import formValidator from "../components/formValidator.js";
import {initialCards,  
  closePopupProfile,
  closePopupCards,
  closePopupImage,
  openPopupCards,
  openPopupImage,
  openPopupProfile
  } from "../components/Utils.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import api from "../components/Api.js";


const profileButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add");
const formProfile = document.querySelector(".popup_type_edit .popup__form"); 
const formCard = document.querySelector(".popup_type_add .popup__form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__ocupation");
const inputName = document.querySelector("#input-name");
const inputAbout = document.querySelector("#input-about");
const inputTitle = document.querySelector("#input-title");
const inputPlace = document.querySelector("#input-place");
const cardArea = document.querySelector(".elements");
const profileImageElement = document.querySelector('.profile__image');
const profileImageOverlay = document.querySelector('.profile__image-overlay');
const profileImageContainer = document.querySelector('.profile__image-container');
let currentUserId = null;
const popupProfile = new PopupWithForm(".popup_type_edit", ({ name, about }) => {
    handleProfileEditSubmit(name, about);
});
const popupCards = new PopupWithForm(".popup_type_add", ({ title, place }) => {
    handleAddCardSubmit(title, place);
});
const popupImage = new PopupWithImage(".popup_type_image"); 
const confirmPopup = new PopupWithConfirmation(".popup_type_confirm");
const popupAvatar = new PopupWithForm(".popup_type_avatar", {
    handleFormSubmit: ({ avatar }) => { 
        handleAvatarSubmit(avatar);
    }
});

popupProfile.setEventListeners();
popupCards.setEventListeners();
popupImage.setEventListeners();
confirmPopup.setEventListeners();
popupAvatar.setEventListeners();

profileImageContainer.addEventListener('click', () => { 
    popupAvatar.open();
});

api.getAppInfo() 
  .then(([userData, cardsData]) => { 
    
    currentUserId = userData._id;
    document.querySelector('.profile__name').textContent = userData.name;
    document.querySelector('.profile__ocupation').textContent = userData.about;
    document.querySelector('.profile__image').src = userData.avatar;
 
    cardsData.forEach(function (item) {
      const newCard = new Card(
        item.name,
        item.link,
        () => {
          popupImage.open(item.name, item.link);
        },
        handleLikeButtonClick,
        handleDeleteButtonClick,
        item._id, 
        item.likes, 
        currentUserId, 
        item.owner._id 
      );
      cardArea.append(newCard.getCards());
    });
  })
  .catch(err => {
    console.error('Error al obtener datos o tarjetas iniciales:', err);
  });

  function handleProfileEditSubmit(values) { 
    const submitButton = formProfile.querySelector('.popup__button'); 
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Guardando...';

    api.editProfile(values.name, values.about) 
        .then(updatedUser => {
            console.log('Perfil actualizado:', updatedUser);
            document.querySelector('.profile__name').textContent = updatedUser.name;
            document.querySelector('.profile__ocupation').textContent = updatedUser.about;
            popupProfile.close();
        })
        .catch(err => {
            console.error('Error al actualizar el perfil:', err);
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
        });
}

   function handleAddCardSubmit(cardName, cardLink) {
    const submitButton = formCard.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Guardando...';

    api.addNewCard(cardName, cardLink)
        .then(newCardData => {
            console.log('Nueva tarjeta añadida:', newCardData);
            const newCardElement = new Card(
                newCardData.name,
                newCardData.link,
                () => { popupImage.open(newCardData.name, newCardData.link); },
                handleLikeButtonClick,
                handleDeleteButtonClick,
                newCardData._id, 
                newCardData.likes, 
                currentUserId 
            );
            cardArea.prepend(newCardElement.getCards());
            popupCards.close();
        })
        .catch(err => {
            console.error('Error al añadir la tarjeta:', err);
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
        });
}

function handleDeleteButtonClick(cardId, cardElement) {
  confirmPopup.setSubmitAction(() => { 
    confirmPopup.renderLoading(true); 
    api.deleteCard(cardId) 
      .then(() => {
        cardElement.remove(); 
        confirmPopup.close(); 
      })
      .catch(err => {
        console.error('Error al eliminar la tarjeta:', err);
      })
      .finally(() => {
        confirmPopup.renderLoading(false); 
      });
  });
  confirmPopup.open(); 
}


function handleLikeButtonClick(cardId, isLiked, likeButtonElement, likeCountElement) {
   
    const apiCallPromise = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

    apiCallPromise
        .then(updatedCard => {
            console.log('Estado del like actualizado:', updatedCard);
            
            if (updatedCard.likes && Array.isArray(updatedCard.likes)) {
               
                const newIsLikedState = updatedCard.likes.some(like => like._id === currentUserId);

                if (newIsLikedState) {
                    likeButtonElement.classList.add("elements__icon-active");
                } else {
                    likeButtonElement.classList.remove("elements__icon-active"); 
                }

                if (likeCountElement) {
                    likeCountElement.textContent = updatedCard.likes.length; 
                }
            } else {
                console.warn('La respuesta de la API no contiene el array de likes esperado:', updatedCard);
            }
        })
        .catch(err => {
            console.error('Error al cambiar el estado del like:', err);
        });
}

function handleAvatarSubmit(avatarLink) {
    const submitButton = document.querySelector(".popup_type_avatar .popup__button"); 
    const originalButtonText = submitButton.textContent; 

    submitButton.textContent = 'Guardando...'; 

    api.updateAvatar(avatarLink)
        .then(updatedUser => {
            profileImageElement.src = updatedUser.avatar;
            popupAvatar.close();
        })
        .catch(err => {
            console.error('Error al actualizar el avatar:', err);
        })
        .finally(() => {
            submitButton.textContent = originalButtonText; 
        });
}

const settings = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  buttonElement: ".popup__button",
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

