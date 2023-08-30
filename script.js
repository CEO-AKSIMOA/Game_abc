// script.js
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letterContainer = document.querySelector('.letter-container');
const restoreButton = document.getElementById('restore-button');
const scoreDisplay = document.getElementById('score-value');
let score = 0;

const removedLetters = [];

// Generate letter tiles
for (let letter of letters) {
  const letterTile = document.createElement('div');
  letterTile.classList.add('letter-tile');
  letterTile.textContent = letter;
  letterTile.dataset.letter = letter;
  letterTile.addEventListener('click', () => {
    removeLetter(letter);
  });
  letterContainer.appendChild(letterTile);
}

// Function to remove a letter
function removeLetter(letter) {
  const letterTile = document.querySelector(`.letter-tile[data-letter="${letter}"]`);
  if (!removedLetters.includes(letter) && letterTile) {
    letterTile.style.display = 'none';
    removedLetters.push(letter);
    score += 10;
    updateScoreDisplay();
  }
}

// Function to restore the last removed letter
function restoreLastLetter() {
  if (removedLetters.length > 0) {
    const lastRemovedLetter = removedLetters.pop();
    const letterTile = document.querySelector(`.letter-tile[data-letter="${lastRemovedLetter}"]`);
    if (letterTile) {
      letterTile.style.display = 'flex';
      score -= 10;
      updateScoreDisplay();
    }
  }
}

// Function to update score display
function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

// Handle keyboard events
document.addEventListener('keydown', (event) => {
  const pressedKey = event.key.toUpperCase();
  if (letters.includes(pressedKey)) {
    removeLetter(pressedKey);
  } else if (pressedKey === 'BACKSPACE') {
    restoreLastLetter();
  }
});

restoreButton.addEventListener('click', restoreLastLetter);
