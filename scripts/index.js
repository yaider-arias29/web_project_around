const profileButton = document.querySelector(".profile__edit");
const popupProfile = document.querySelector(".popup");
const popupClosed = document.querySelector(".popup__button");
const formProfile = document.querySelector(".form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__ocupation");
const inputName = document.querySelector("#input-name");
const inputAbout = document.querySelector("#input-about");

function openPopupProfile() {
    popupProfile.classList.add("popup_opened");
}

function closePopupProfile() {
    popupProfile.classList.remove("popup_opened");
}

profileButton.addEventListener("click", openPopupProfile);

formProfile.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopupProfile()
});

