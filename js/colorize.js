'use strict';

(function () {

  window.colorize = function (element, input, colors) {
    element.addEventListener('click', function () {
      var color = colors[window.util.selectRandomIndex(colors)];
      input.value = color;
      if (element.tagName.toLowerCase() === 'div') {
        element.style.background = color;
      } else {
        element.style.fill = color;
      }
    });
  };
})();
