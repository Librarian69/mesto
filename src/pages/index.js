import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { cardConfig, config } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithDelete from "../components/PopupWithDelete";

import {
  popupProfileOpenButton,
  popupAddForm,
  popupAddOpenButton,
  popupProfileForm,
  btnAvatar,
  updateAvatarForm,
} from "../utils/constants";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    Authorization: "03c31aba-d3c5-4738-8c0c-1ec3028f3f5d",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    section.renderItems(cards.reverse());
  })
  .catch((error) => {
    console.log(error);
  });

popupAddOpenButton.addEventListener("click", () => {
  placeFormValidator.resetValidation();
  popupFormNewCard.open();
});

popupProfileOpenButton.addEventListener("click", () => {
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetValidation();
  popupFormProfile.open();
});

btnAvatar.addEventListener("click", () => {
  popupWithAvatar.open();
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function generateCard(dataCard) {
  const newCard = new Card(
    dataCard,
    cardConfig,
    ".template-photo-card",
    handleCardClick,
    handleDelete,
    getId,
    (id) => {
      api
        .likeCard(id)
        .then((res) => {
          newCard.getLikesCount(res);
          newCard.changeLike(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    (id) => {
      api
        .dislikeCard(id)
        .then((res) => {
          newCard.getLikesCount(res);
          newCard.changeLike(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );

  return newCard.generateCard();
}

function handleDelete(data, deleteCard) {
  popupWithDelete.open();
  popupWithDelete.setData(data, deleteCard);
}

function getId() {
  return userInfo.getUserId();
}

const profileFormValidator = new FormValidator(config, popupProfileForm);
profileFormValidator.enableValidator();

const placeFormValidator = new FormValidator(config, popupAddForm);
placeFormValidator.enableValidator();

const avatarFormValidator = new FormValidator(config, updateAvatarForm);
avatarFormValidator.enableValidator();

const section = new Section(
  {
    renderer: (card) => {
      const element = generateCard(card);
      section.addItem(element);
      // return generateCard(card);
      // section.addItem(generateCard(card))
    },
  },
  ".cards-grid__list"
);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__avatar"
);
const popupWithImage = new PopupWithImage({ selector: ".popup_card-photo" });
const popupFormProfile = new PopupWithForm({
  selector: ".popup_edit",
  handleSubmitForm: (data) => {
    popupFormProfile.showLoading(true);
    api
      .setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupFormProfile.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupFormProfile.showLoading(false);
      });
  },
});
const popupFormNewCard = new PopupWithForm({
  selector: ".popup_add-photo",
  handleSubmitForm: (data) => {
    popupFormNewCard.showLoading(true);
    api
      .addNewCard(data)
      .then((res) => {
        const element = generateCard(res);
        section.addItem(element);
        // section.addItem(res)
        popupFormNewCard.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupFormNewCard.showLoading(false);
      });
  },
});

const popupWithDelete = new PopupWithDelete({
  selector: ".popup_delete",
  deleteCardApi: () => {
    const { data, deleteCard } = popupWithDelete.getData();

    api
      .deleteCard(data._id)
      .then(() => {
        deleteCard();
        popupWithDelete.close();
      })
      .catch((error) => {
        console.log(error);
      });
  },
});

const popupWithAvatar = new PopupWithForm({
  selector: ".popup_avatar",
  handleSubmitForm: (data) => {
    popupWithAvatar.showLoading(true);
    api
      .setAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithAvatar.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupWithAvatar.showLoading(false);
      });
  },
});

popupWithImage.setEventListeners();
popupFormNewCard.setEventListeners();
popupFormProfile.setEventListeners();
popupWithDelete.setEventListeners();
popupWithAvatar.setEventListeners();
