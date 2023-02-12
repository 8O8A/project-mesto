const cardsArray = [
  {
    name: 'Куки',
    link: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Сонечка',
    link: 'https://images.unsplash.com/photo-1584290867415-527a8475726d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODB8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Ириска',
    link: 'https://images.unsplash.com/photo-1583084602580-ff7d568021cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTA3fHxraXR0ZW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'КоКо',
    link: 'https://images.unsplash.com/photo-1562119464-7480f81577cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTUyfHxjYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Персик',
    link: 'https://images.unsplash.com/photo-1621752779053-b045006fe2e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTI2fHxjYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Пупи',
    link: 'https://images.unsplash.com/photo-1585672675554-da7ad8040bdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzAwfHxraXR0ZW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
];

const gallery = document.querySelector('.gallery__elements');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title'); //имя пользователя в профиле
const profileAbout = document.querySelector('.profile__subtitle'); //род деятельности пользователя в профиле
const popupName = document.querySelector('.popup__input-field_type_name'); //имя пользователя в popup'e
const popupAbout = document.querySelector('.popup__input-field_type_about'); //род деятельности пользователя в popup'e

//Профиль
const popupProfile = document.querySelector('.popup__profile'); //popup Профиль
const openEditButton = document.querySelector('.profile__edit-button'); //кнопка "Редактировать" профиль
const formProfile = document.forms.formProfile; // форма попапа Профиля
const nameInput = formProfile.elements.inputName; // поле ввода формы профиля
const aboutInput = formProfile.elements.inputAbout; // поле ввода формы профиля
const buttonSaveProfile = formProfile.querySelector('.popup__save-button')

//Новое место
const popupNewPlace = document.querySelector('.popup__new-place'); //popup Новое место
const buttonNewPlace = document.querySelector('.profile__add-button'); //кнопка "Новое место"
const formPlace = document.forms.formPlace; //форма попапа Новое место
const placeTitle = formPlace.elements.inputTitle; // поле ввода формы Новое место
const placeLink = formPlace.elements.inputLink; //поле ввода формы Новое место

//Просмотр фотографии
const popupPreview = document.querySelector('.popup__preview');
const popupBigImage = document.querySelector('.popup__big-image');
const popupFigcaption = document.querySelector('.popup__figcaption');

//шаблон
const template = document.querySelector('#template'); //шаблон
const templateImage = template.querySelector('.gallery__image');
const templateImageTitle = template.querySelector('.gallery__title');

const buttonSubmit = document.querySelector('.popup__submit');

//поле ошибки в формах
const inputField = document.querySelectorAll('.popup__input');


const errorEraser = function() {
  inputField.forEach(function(error) {
    error.querySelector('.popup__input-field').classList.remove('popup__input-error');
    error.querySelector('.popup__span-error').classList.remove('popup__span-error_active');
  })
}

//функция открытия попапа
const openPopup = function (thisPopup) {
  thisPopup.classList.add('popup_opened');
};


//функция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

//находим все попапы в проекте и пробегаемся по ним, навешивая обработчики
popups.forEach(function (popupArray, i) {
  popupArray.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('popup_opened')) {
      popups[i].classList.remove('popup_opened')
      // closePopup(popups)
      errorEraser();
    }
    if (event.target.classList.contains('popup__close-button')) {
      popups[i].classList.remove('popup_opened')
      // closePopup(popups)
      errorEraser();
    }
  });
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      popups[i].classList.remove('popup_opened')
      // closePopup(popups)
      errorEraser();
    }
  });
});


//открываем попап "Редактировать профиль"
openEditButton.addEventListener('click', function () {
  nameInput.value = '';
  aboutInput.value = '';
  openPopup(popupProfile)
  buttonDisable(buttonSaveProfile);
  buttonSaveProfile.classList.add('popup__save-button_inactive');
});

//открываем попап "Новое место"
buttonNewPlace.addEventListener('click', function () {
  placeTitle.value = '';
  placeLink.value = '';
  openPopup(popupNewPlace);
  buttonDisable(buttonSubmit);
  buttonSubmit.classList.add('popup__save-button_inactive');
});

// Обработчик «отправки» формы "Редактировать профиль"
function profileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  errorField.classList.remove('popup__span-error_active');
  closePopup(popupProfile);
};

// Обработчик «отправки» формы "Новое место"
formPlace.addEventListener('submit', function (event) {
  event.preventDefault();
  addCard(placeTitle.value, placeLink.value);
  placeTitle.value = '';
  placeLink.value = '';
  closePopup(popupNewPlace);
});

formProfile.addEventListener('submit', profileFormSubmit);

//добавляем фотографии из массива на сайт
cardsArray.forEach(function (element) {
  const templateElement = template.content.cloneNode(true); //копия шаблона
  const templateImage = templateElement.querySelector('.gallery__image');
  const templateImageTitle = templateElement.querySelector('.gallery__title');
  templateImage.src = element.link;
  templateImage.alt = element.name;
  templateImageTitle.textContent = element.name;
  gallery.append(templateElement);
});

/////////////////////////////////////////////////////////////////////////////


//добавление новой карточки
function addCard(title, link) {
  const templateElement = template.content.cloneNode(true); //копия шаблона
  const templateImage = templateElement.querySelector('.gallery__image');
  const templateImageTitle = templateElement.querySelector('.gallery__title');
  templateImage.src = link;
  templateImage.alt = title;
  templateImageTitle.textContent = title;
  gallery.prepend(templateElement);
};





//ставим лайки фотографиям
gallery.addEventListener('click', function (like) {
  if (like.target.classList.contains('gallery__like-button')) {
    like.target.classList.toggle('gallery__like-button_active')
  };
});


//удаляем фотографию
gallery.addEventListener('click', function (trash) {
  if (trash.target.classList.contains('gallery__trash')) {
    trash.target.closest('.gallery__card').remove()
    console.log('вы нажали на мусорку')
  }
});

//просмотр фотографии
gallery.addEventListener('click', function (image) {
  if (image.target.classList.contains('gallery__image')) {
    popupBigImage.src = image.target.src;
    popupBigImage.alt = image.target.alt;
    popupFigcaption.textContent = image.target.alt;
    // image.target.src = popupBigImage.src;
    // image.target.alt = popupBigImage.alt;
    // image.target.alt = popupFigcaption.textContent;
    openPopup(popupPreview)
    console.log(popupBigImage)
  }
});



