'use strict';

// cloud dimensions
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

// text and statistics dimensions
var GAP = 15;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_MAX_HEIGHT = 150;


// function to draw the cloud
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH * 0.85, y);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT * 0.15);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.closePath();

  ctx.fill();
};

// find the max value in an array if it's not empty
var getMaxElement = function (arr) {
  if (arr.length === 0) {
    // console.log('This is an empty array');
  } else {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

// display the cloud, text, and statistics
window.renderStatistics = function (ctx, players, times) {
  // draws the cloud and its shadow
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // displays text
  ctx.fillStyle = '#35a921';
  ctx.font = 'PT Mono 16px';
  ctx.fillText('Ура! Вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP * 2);

  // displays game statistics
  var maxTime = getMaxElement(times);

  // for each player defines the histogram color, size, and position on the cloud
  for (var i = 0; i < players.length; i++) {

    if (players[i] === 'Вы' || players[i] === 'ВЫ' || players[i] === 'вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var blueSaturationVariation = Math.random();
      ctx.fillStyle = 'rgba(0, 0, 255, ' + blueSaturationVariation + ')';
    }

    var barIndivHeight = BAR_MAX_HEIGHT * times[i] / maxTime;
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - barIndivHeight, BAR_WIDTH, barIndivHeight);

    // displays histogram legend
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - barIndivHeight - GAP);
  }
};
