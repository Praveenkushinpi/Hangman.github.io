const wordList = ["rainbow", "computer", "javascript", "hangman", "coding", "developer", "excellent", "diamond", "November","ambient", "February", "minecraft"];

let chosenWord = "";

let displayWord = [];

let guessedLetters = [];

let incorrectGuesses = 0;

let gameOver = false;

const wordDisplay = document.querySelector('.word-display');

const guessesText = document.querySelector('.guesses-text b');

const hintText = document.querySelector('.hint-text b');

const modal = document.querySelector('.game-modal');

const modalContent = modal.querySelector('.content');

const playAgainButton = modal.querySelector('.play-again');

const keyboard = document.querySelector('.keyboard');

const hangmanImg = document.querySelector('.hangman-box img');

function startGame() {

  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

  displayWord = Array(chosenWord.length).fill('_');

  guessedLetters = [];

  incorrectGuesses = 0;

  gameOver = false;

  wordDisplay.innerHTML = displayWord.map(letter => `<li class="letter">${letter}</li>`).join('');

  guessesText.textContent = '';

  hintText.textContent = chosenWord[0].toUpperCase();

  hangmanImg.src = `https://cloud-fakcb8xar-hack-club-bot.vercel.app/0hangman-0.svg`;

  // Create the keyboard

  createKeyboard();

}

function createKeyboard() {

  keyboard.innerHTML = '';

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  alphabet.forEach(letter => {

    const button = document.createElement('button');

    button.textContent = letter;

    button.addEventListener('click', () => makeGuess(letter));

    keyboard.appendChild(button);

  });

}

function makeGuess(letter) {

  if (gameOver || guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (chosenWord.includes(letter)) {

    updateWordDisplay(letter);

  } else {

    incorrectGuesses++;

    updateHangmanImage();

  }

  updateKeyboard();

  checkGameStatus();

}

function updateHangmanImage() {

  switch (incorrectGuesses) {

    case 1:

      hangmanImg.src = "https://cloud-fakcb8xar-hack-club-bot.vercel.app/1hangman-1.svg";

      break;

    case 2:

      hangmanImg.src = "https://cloud-fakcb8xar-hack-club-bot.vercel.app/2hangman-2.svg";
      break;

    case 3:

      hangmanImg.src = "https://cloud-fakcb8xar-hack-club-bot.vercel.app/3hangman-3.svg";

      break;

    case 4:

      hangmanImg.src = "https://cloud-fakcb8xar-hack-club-bot.vercel.app/4hangman-4.svg";

      break;

    case 5:

      hangmanImg.src = "https://cloud-fakcb8xar-hack-club-bot.vercel.app/5hangman-5.svg";

      break;

    case 6:

      hangmanImg.src = "https://cloud-fakcb8xar-hack-club-bot.vercel.app/6hangman-6.svg";

      break;

    default:

      hangmanImg.src = "https://cloud-fakcb8xar-hack-club-bot.vercel.app/6hangman-0.svg"; 

      break;

  }

}

function updateWordDisplay(letter) {

  displayWord = displayWord.map((char, index) => {

    return chosenWord[index] === letter ? letter : char;

  });

  wordDisplay.innerHTML = displayWord.map(letter => `<li class="letter">${letter}</li>`).join('');

  guessesText.textContent = guessedLetters.join(', ');

}

function updateKeyboard() {

  const buttons = keyboard.querySelectorAll('button');

  buttons.forEach(button => {

    if (guessedLetters.includes(button.textContent)) {

      button.disabled = true;

    }

  });

}

function checkGameStatus() {

  if (incorrectGuesses === 6) {

    gameOver = true;

    showModal("Game Over!", `The correct word was: ${chosenWord}`, "https://cloud-1jd09sqn5-hack-club-bot.vercel.app/0lost.gif");

  } else if (displayWord.join('') === chosenWord) {

    gameOver = true;

    showModal("You Win!", `The correct word was: ${chosenWord}`, "https://cloud-1jd09sqn5-hack-club-bot.vercel.app/1victory.gif");

  }

}

function showModal(title, message, imgSrc) {

  modal.classList.add('show');

  modalContent.querySelector('h4').textContent = title;

  modalContent.querySelector('p').textContent = message;

  modalContent.querySelector('img').src = imgSrc;

}

playAgainButton.addEventListener('click', () => {

  modal.classList.remove('show');

  startGame();

});

startGame();