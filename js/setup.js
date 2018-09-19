'use strict';

// wizards data
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
// var WIZARD_FIREBALL_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];


// number of wizards to be created
var wizardsNumber = 4;

// wizards array
var wizards = [];

// generates a random index of the array element
var selectRandomIndex = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

// generates a one wizard object and adds it to the array
var createWizard = function (nameArray1, nameArray2, colorArray1, colorArray2) {
  var newWizard = {
    name: nameArray1[selectRandomIndex(nameArray1)] + ' ' + nameArray2[selectRandomIndex(nameArray2)],
    coatColor: colorArray1[selectRandomIndex(colorArray1)],
    eyesColor: colorArray2[selectRandomIndex(colorArray2)]
  };
  wizards.push(newWizard);
  return wizards;
};

// creates a array of wizard objects
for (var i = 1; i <= wizardsNumber; i++) {
  createWizard(WIZARD_FIRST_NAMES, WIZARD_LAST_NAMES, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);
}

// finds user dialog section
var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

// finds wizard list
var similarListElement = document.querySelector('.setup-similar-list');

// finds individal wizard template
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

// creates one wizard
var renderWizard = function (characterData) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = characterData.name;
  wizardElement.querySelector('.wizard-coat').style.fill = characterData.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = characterData.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

// creates wizards and appends them to fragment element
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

// renders wizards
similarListElement.appendChild(fragment);


// show wizards setup section
userDialog.querySelector('.setup-similar').classList.remove('hidden');


// Event handlers

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = userDialog.querySelector('.setup-user-name');
userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var wizardCoat = userDialog.querySelector('.wizard-coat');
var wizardEyes = userDialog.querySelector('.wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var coatColor = userDialog.querySelector('input[name="coat-color"]');
var eyesColor = userDialog.querySelector('input[name="eyes-color"]');
var fireballColor = userDialog.querySelector('input[name="fireball-color"]');

var changeCoatColor = function () {
  var colorIndex = selectRandomIndex(WIZARD_COAT_COLOR);
  coatColor.value = WIZARD_COAT_COLOR[colorIndex];
  wizardCoat.style.fill = WIZARD_COAT_COLOR[colorIndex];
  return WIZARD_COAT_COLOR[colorIndex];
};

var changeEyesColor = function () {
  var colorIndex = selectRandomIndex(WIZARD_EYES_COLOR);
  eyesColor.value = WIZARD_EYES_COLOR[colorIndex];
  wizardEyes.style.fill = WIZARD_EYES_COLOR[colorIndex];
  return WIZARD_EYES_COLOR[colorIndex];
};

var changeFireballColor = function () {
  var colorIndex = selectRandomIndex(WIZARD_FIREBALL_COLOR);
  fireballColor.value = WIZARD_FIREBALL_COLOR[colorIndex];
  wizardFireball.style.background = WIZARD_FIREBALL_COLOR[colorIndex];
  return WIZARD_FIREBALL_COLOR[colorIndex];
};

wizardCoat.addEventListener('click', changeCoatColor);
wizardEyes.addEventListener('click', changeEyesColor);
wizardFireball.addEventListener('click', changeFireballColor);
