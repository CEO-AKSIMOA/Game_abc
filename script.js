// script.js
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letterContainer = document.querySelector('.letter-container');
const scoreDisplay = document.getElementById('score-value');
let score = 0;

const removedLetters = [];

// Generate letter tiles
for (let letter of letters) {
  const letterTile = document.createElement('div');
  letterTile.classList.add('letter-tile');
  letterTile.textContent = letter;
  letterTile.dataset.letter = letter;
  letterContainer.appendChild(letterTile);
}

// Function to remove a letter
function removeLetter(tile) {
  const letter = tile.dataset.letter;
  if (!removedLetters.includes(letter)) {
    tile.style.opacity = '0'; // Mengubah opasitas menjadi 0
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
      letterTile.style.opacity = '1'; // Mengembalikan opasitas menjadi 1
      score -= 10;
      updateScoreDisplay();
    }
  }
}

// Function to reset all letters
function resetAllLetters() {
  const letterTiles = document.querySelectorAll('.letter-tile');
  letterTiles.forEach(tile => {
    tile.style.opacity = '1'; // Mengembalikan opasitas menjadi 1
  });
  removedLetters.length = 0;
  score = 0;
  updateScoreDisplay();
}

// Function to update score display
function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

// Keyboard event listener
document.addEventListener('keydown', event => {
  const pressedKey = event.key.toUpperCase();
  if (pressedKey === 'BACKSPACE') {
    restoreLastLetter();
  } else if (letters.includes(pressedKey)) {
    const letterTile = document.querySelector(`.letter-tile[data-letter="${pressedKey}"]`);
    if (letterTile) {
      removeLetter(letterTile);
    }
  }
});

// Reset using Shift key
document.addEventListener('keydown', event => {
  if (event.key === 'Shift') {
    resetAllLetters();
  }
});

// Click event listener for letter tiles
letterContainer.addEventListener('click', event => {
  if (event.target.classList.contains('letter-tile')) {
    const letterTile = event.target;
    removeLetter(letterTile);
  }
});
