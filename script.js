'use strict';

let secretNumber = generateSecretNumber();
let score = 20;
let highScore = 0;

function generateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}
function scoreValue(value) {
  document.querySelector('.score').textContent = value;
}

document.querySelector('.check').addEventListener('click', game);

function game() {
  const inputValue = Number(document.querySelector('.guess').value);
  if (!inputValue) {
    displayMessage('🔴 Немає числа');
  } else if (inputValue !== secretNumber) {
    if (score > 1) {
      displayMessage(
        inputValue > secretNumber
          ? '😁 Загадане число менше.'
          : '😊 Загадане число більше.'
      );
      score--;
      scoreValue(score);
    } else {
      displayMessage('Ви програли 😢');
      scoreValue(0);
    }
  } else if (inputValue == secretNumber) {
    displayMessage('🎉 Ви вгадали число!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = score;
    }
  }
}

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  scoreValue(score);
  displayMessage('Починайте вгадувати...');
  document.querySelector('.number').textContent = '?';
  secretNumber = generateSecretNumber();
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
});

document.querySelector('.guess').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    game();
  }
});
