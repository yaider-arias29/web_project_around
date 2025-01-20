const popupProfile = document.querySelector("#popup__edit");
const popupCards = document.querySelector("#popup__add");
const popupImage = document.querySelector("#popup__image");
const popupImagePlace = document.querySelector(".popup__image-place");
const popupImageTitle = document.querySelector(".popup__image-title");

export const initialCards = [
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

//export function openPopupProfile() {
    //popupProfile.classList.add("popup_opened");
    //document.addEventListener("keydown", closeOnEsc);
    //document.addEventListener("click", closeOnClick);
//}

//export function closePopupProfile() {
    //popupProfile.classList.remove("popup_opened");
    //document.removeEventListener("keydown", closeOnEsc);
    //document.removeEventListener("click", closeOnClick);
//}

//export function openPopupCards() {
   // popupCards.classList.add("popup_opened");
    //document.addEventListener("keydown", closeOnEsc);
    //document.addEventListener("click", closeOnClick);
//}

//export function closePopupCards() {
    //popupCards.classList.remove("popup_opened");
    //document.removeEventListener("keydown", closeOnEsc);
   // document.removeEventListener("click", closeOnClick)
//}

//export function openPopupImage(title, link) {
  //popupImage.classList.add("popup_opened");
  //popupImageTitle.textContent = title;
  //popupImagePlace.src = link;
  //document.addEventListener("keydown", closeOnEsc);
  //document.addEventListener("click", closeOnClick)
//}

//export function closePopupImage() {
  //popupImage.classList.remove("popup_opened");
  //document.removeEventListener("keydown", closeOnEsc);
  //document.removeEventListener("click", closeOnClick)
//}