'use strict';

(function () {

  // wizards data
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // number of wizards to be created
  var wizardsNumber = 4;

  // wizards array
  var wizards = [];

  // generates a one wizard object and adds it to the array
  var createWizard = function (nameArray1, nameArray2, colorArray1, colorArray2) {
    var newWizard = {
      name: nameArray1[window.util.selectRandomIndex(nameArray1)] + ' ' + nameArray2[window.util.selectRandomIndex(nameArray2)],
      coatColor: colorArray1[window.util.selectRandomIndex(colorArray1)],
      eyesColor: colorArray2[window.util.selectRandomIndex(colorArray2)]
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

  // Form validation
  var userNameInput = userDialog.querySelector('.setup-user-name');
  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.dialog.onPopupEscPress);
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

  // Color change
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var coatColor = userDialog.querySelector('input[name="coat-color"]');
  var eyesColor = userDialog.querySelector('input[name="eyes-color"]');
  var fireballColor = userDialog.querySelector('input[name="fireball-color"]');

  window.colorize(wizardCoat, coatColor, WIZARD_COAT_COLOR);
  window.colorize(wizardEyes, eyesColor, WIZARD_EYES_COLOR);
  window.colorize(wizardFireball, fireballColor, WIZARD_FIREBALL_COLOR);
})();
