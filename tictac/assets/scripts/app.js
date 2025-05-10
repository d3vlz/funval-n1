/**
 * Tic Tac Toe Game
 * A responsive Tic Tac Toe game with options to play against CPU or another player
 */

// Game constants
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

// Game state
const gameState = {
  currentPlayerMark: O_CLASS,
  isVsPlayer: false,
  oTurn: false,
  xWin: 0,
  oWin: 0,
  tie: 0,
  winningArray: null,
  currentClass: null,
};

// DOM elements
const elements = {
  vsCpuBtn: document.getElementById('vs-cpu'),
  vsPlayerBtn: document.getElementById('vs-player'),
  restartBtn: document.getElementById('restart-btn'),
  gameStartEl: document.getElementById('game-start'),
  gamePlayEl: document.getElementById('gameplay'),
  gameMarksEl: document.querySelectorAll('#game-start-marks div'),
  gameBoardEl: document.getElementById('gameplay-board'),
  modalEl: document.getElementById('modal'),
  backdropEl: document.getElementById('backdrop'),
  cells: document.querySelectorAll('.gameplay__card'),
  opponentMessage: document.getElementById('opponent-message'),
};

/**
 * Event handler for setting the game mode (vs CPU or vs Player)
 */
function setGameModeHandler() {
  const btnClickedId = this.id;
  gameState.isVsPlayer = (btnClickedId === 'vs-player');
  
  toggleElementDisplay(elements.gameStartEl, 'block', 'hidden');
  toggleElementDisplay(elements.gamePlayEl, 'hidden', 'grid');
  
  startGame();
}

/**
 * Toggles the display class of a DOM element
 * @param {Element} domEl - The DOM element to modify
 * @param {string} displayRemove - The display class to remove
 * @param {string} displayAdd - The display class to add
 */
function toggleElementDisplay(domEl, displayRemove, displayAdd) {
  domEl.classList.remove(displayRemove);
  domEl.classList.add(displayAdd);
}

/**
 * Initializes and starts the game
 */
function startGame() {
  setBoardHoverClass();
  setScoreBoard();
  setTurn();

  if (!gameState.isVsPlayer) {
    playVsCpu();
  } else {
    playVsPlayer();
  }
}

/**
 * Sets the hover class on the game board based on whose turn it is
 */
function setBoardHoverClass() {
  if (gameState.oTurn) {
    elements.gameBoardEl.classList.remove(X_CLASS);
    elements.gameBoardEl.classList.add(O_CLASS);
  } else {
    elements.gameBoardEl.classList.remove(O_CLASS);
    elements.gameBoardEl.classList.add(X_CLASS);
  }
}

/**
 * Updates the scoreboard with player information and scores
 */
function setScoreBoard() {
  const xWinEl = document.getElementById('x-win');
  const tieEl = document.getElementById('tie');
  const oWinEl = document.getElementById('o-win');

  xWinEl.innerHTML = `${
    gameState.isVsPlayer
      ? 'X (P1)'
      : gameState.currentPlayerMark === O_CLASS
      ? 'X (CPU)'
      : 'X (You)'
  } <span id="x-win-inner" class="block text-xl md:text-2xl font-bold">${gameState.xWin}</span>`;
  
  tieEl.innerHTML = `Ties <span id="tie-inner" class="block text-xl md:text-2xl font-bold">${gameState.tie}</span>`;
  
  oWinEl.innerHTML = `${
    gameState.isVsPlayer
      ? 'O (P2)'
      : gameState.currentPlayerMark === O_CLASS
      ? 'O (You)'
      : 'O (CPU)'
  } <span id="o-win-inner" class="block text-xl md:text-2xl font-bold">${gameState.oWin}</span>`;
}

/**
 * Updates the turn indicator
 */
function setTurn() {
  const turnEl = document.getElementById('gameplay-turn');

  turnEl.innerHTML = `
    <svg class="w-5 h-5 fill-silver">
      <use xlink:href="./assets/images/SVG/icon-${gameState.oTurn ? O_CLASS : X_CLASS}-default.svg#icon-${
        gameState.oTurn ? O_CLASS : X_CLASS
      }-default"></use>
    </svg> &nbsp; Turn
  `;
}

/**
 * Handles the CPU gameplay logic
 */
function playVsCpu() {
  if (gameState.currentPlayerMark === O_CLASS) {
    getCpuChoice(); // CPU starts first
  } else {
    getPlayerChoice(); // Player starts first
  }
}

/**
 * Sets up player vs player gameplay
 */
function playVsPlayer() {
  getPlayerChoice();
}

/**
 * Gets all empty cells on the board
 * @returns {Array} - Array of empty cell elements
 */
function getEmptyCells() {
  return Array.from(elements.cells).filter(
    cell => !cell.classList.contains('x') && !cell.classList.contains('o')
  );
}

/**
 * Chooses the best move for the CPU (currently random)
 * @returns {Element} - The cell element chosen by the CPU
 */
function setCpuBestMove() {
  const emptyCells = getEmptyCells();
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

/**
 * Handles the CPU's turn
 */
async function getCpuChoice() {
  gameState.currentClass = gameState.oTurn ? O_CLASS : X_CLASS;

  elements.gameBoardEl.classList.remove(O_CLASS);
  elements.gameBoardEl.classList.remove(X_CLASS);

  elements.cells.forEach(cell => cell.removeEventListener('click', playHandler));

  toggleElementDisplay(elements.opponentMessage, 'hidden', 'block');

  await new Promise(resolve => {
    setTimeout(() => {
      placeMark(setCpuBestMove(), gameState.currentClass);
      toggleElementDisplay(elements.opponentMessage, 'block', 'hidden');
      setGameLogic();
      resolve('resolved');
    }, 2000);
  });

  getPlayerChoice();
}

/**
 * Sets up the player's turn
 */
function getPlayerChoice() {
  elements.cells.forEach(cell => {
    if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
      cell.addEventListener('click', playHandler, { once: true });
    }
  });
}

/**
 * Places a mark (X or O) on the specified cell
 * @param {Element} cell - The cell to place the mark on
 * @param {string} mark - The mark to place (X_CLASS or O_CLASS)
 */
function placeMark(cell, mark) {
  cell.classList.add(mark);
}

/**
 * Checks the game state after a move
 */
function setGameLogic() {
  if (checkWin(gameState.currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

/**
 * Handles a player's move
 * @param {Event} event - The click event
 */
function playHandler(event) {
  const cell = event.target;
  gameState.currentClass = gameState.oTurn ? O_CLASS : X_CLASS;

  placeMark(cell, gameState.currentClass);
  setGameLogic();

  if (!gameState.isVsPlayer && !checkWin(gameState.currentClass) && !isDraw()) {
    getCpuChoice();
  }
}

/**
 * Checks if the current player has won
 * @param {string} currentClass - The current player's mark (X_CLASS or O_CLASS)
 * @returns {boolean} - True if the current player has won, false otherwise
 */
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every((element, index, array) => {
      let condition = elements.cells[element].classList.contains(currentClass);
      if (condition) gameState.winningArray = array;
      return condition;
    });
  });
}

/**
 * Checks if the game is a draw
 * @returns {boolean} - True if the game is a draw, false otherwise
 */
function isDraw() {
  return [...elements.cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

/**
 * Configures the modal buttons for next round or quitting
 */
function configureModalButtons() {
  const nextRoundBtn = document.getElementById('next-round');
  const quitBtn = document.getElementById('quit');

  nextRoundBtn.addEventListener('click', setNextRound);
  quitBtn.addEventListener('click', () => {
    location.reload();
  });
}

/**
 * Ends the game and shows the appropriate modal
 * @param {boolean} draw - True if the game ended in a draw, false otherwise
 */
function endGame(draw) {
  if (draw) {
    gameState.tie++;
    document.getElementById('tie-inner').innerText = gameState.tie;

    toggleElementDisplay(elements.backdropEl, 'hidden', 'block');
    toggleElementDisplay(elements.modalEl, 'hidden', 'block');

    elements.modalEl.innerHTML = `
      <h4 class="text-4xl font-bold uppercase">Round Tied</h4>

      <div class="mt-8">
        <button id="quit" class="inline-block py-3 px-5 bg-silver shadow-inner-silver rounded-xl font-bold uppercase text-dark-navy transition-all duration-300 hover:bg-silver-hover">Quit</button>
        <button id="next-round" class="inline-block py-3 px-5 bg-light-yellow shadow-inner-yellow rounded-xl font-bold uppercase text-dark-navy transition-all duration-300 hover:bg-light-yellow-hover ml-4">Next Round</button>
      </div>
    `;
  } else {
    setWinner(gameState.oTurn);
  }

  configureModalButtons();
}

/**
 * Swaps the current player
 */
function swapTurns() {
  gameState.oTurn = !gameState.oTurn;
  setTurn();
}

/**
 * Sets up the winner display and updates scores
 */
function setWinner() {
  const xWinInnerEl = document.getElementById('x-win-inner');
  const oWinInnerEl = document.getElementById('o-win-inner');

  if (gameState.oTurn) {
    gameState.oWin++;
  } else {
    gameState.xWin++;
  }

  xWinInnerEl.innerText = gameState.xWin;
  oWinInnerEl.innerText = gameState.oWin;

  // Add win class to winning cells
  gameState.winningArray.forEach(index => {
    elements.cells[index].classList.add('win');
  });

  setTimeout(() => {
    toggleElementDisplay(elements.backdropEl, 'hidden', 'block');
    toggleElementDisplay(elements.modalEl, 'hidden', 'block');
  }, 500);

  // Set modal content
  elements.modalEl.innerHTML = `
    <h4 class="text-base font-bold uppercase">
      ${
        gameState.isVsPlayer
          ? gameState.oTurn
            ? 'Player 2 Win'
            : 'Player 1 win'
          : gameState.oTurn && gameState.currentPlayerMark === 'o'
          ? 'You won'
          : !gameState.oTurn && gameState.currentPlayerMark === 'x'
          ? 'You won'
          : 'oh No, you lost...'
      }
    </h4>
    <div class="flex items-center justify-center mt-6">
      <svg class="w-16 h-16 md:w-16 md:h-16">
        <use xlink:href="./assets/images/SVG/icon-${gameState.oTurn ? O_CLASS : X_CLASS}.svg#icon-${gameState.oTurn ? O_CLASS : X_CLASS}"></use>
      </svg>
      <h1 class="text-4xl font-bold uppercase ml-6 ${gameState.oTurn ? 'text-light-yellow' : 'text-light-blue'}">takes the round</h1>
    </div>

    <div class="mt-8">
      <button id="quit" class="inline-block py-3 px-5 bg-silver shadow-inner-silver rounded-xl font-bold uppercase text-dark-navy transition-all duration-300 hover:bg-silver-hover">Quit</button>
      <button id="next-round" class="inline-block py-3 px-5 bg-light-yellow shadow-inner-yellow rounded-xl font-bold uppercase text-dark-navy transition-all duration-300 hover:bg-light-yellow-hover ml-4">Next Round</button>
    </div>
  `;
}

/**
 * Sets up the next round
 */
function setNextRound() {
  gameState.oTurn = false;

  toggleElementDisplay(elements.modalEl, 'block', 'hidden');
  toggleElementDisplay(elements.backdropEl, 'block', 'hidden');

  // Reset the board
  elements.cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.classList.remove('win');
    cell.removeEventListener('click', playHandler);
  });

  startGame();
}

/**
 * Handles the restart button click
 */
function restartHandler() {
  elements.modalEl.innerHTML = `
    <h1 class="text-4xl font-bold uppercase">Restart Game</h1>

    <div class="mt-8">
      <button id="btn-cancel" class="inline-block py-3 px-5 bg-silver shadow-inner-silver rounded-xl font-bold uppercase text-dark-navy transition-all duration-300 hover:bg-silver-hover">
        No, Cancel
      </button>
      <button id="btn-restart" class="inline-block py-3 px-5 bg-light-yellow shadow-inner-yellow rounded-xl font-bold uppercase text-dark-navy transition-all duration-300 hover:bg-light-yellow-hover ml-4">
        Yes, Restart
      </button>
    </div>
  `;

  const restartBtn = document.getElementById('btn-restart');
  const cancelBtn = document.getElementById('btn-cancel');

  toggleElementDisplay(elements.modalEl, 'hidden', 'block');

  restartBtn.addEventListener('click', setNextRound);
  cancelBtn.addEventListener('click', () => {
    toggleElementDisplay(elements.modalEl, 'block', 'hidden');
  });
}

/**
 * Handles the user's mark choice (X or O)
 */
function getUserChoiceHandler() {
  gameState.currentPlayerMark = this.id;
  this.classList.add('bg-silver');

  // Update UI to show selected mark
  if (this.nextElementSibling) {
    this.nextElementSibling.classList.remove('bg-silver');
    this.nextElementSibling.classList.remove('selected');
    this.classList.add('selected');
    
    // Update SVG fill colors
    this.querySelector('svg').classList.remove('fill-silver');
    this.querySelector('svg').classList.add('fill-dark-navy');
    this.nextElementSibling.querySelector('svg').classList.remove('fill-dark-navy');
    this.nextElementSibling.querySelector('svg').classList.add('fill-silver');
  } else {
    this.previousElementSibling.classList.remove('bg-silver');
    this.previousElementSibling.classList.remove('selected');
    this.classList.add('selected');
    
    // Update SVG fill colors
    this.querySelector('svg').classList.remove('fill-silver');
    this.querySelector('svg').classList.add('fill-dark-navy');
    this.previousElementSibling.querySelector('svg').classList.remove('fill-dark-navy');
    this.previousElementSibling.querySelector('svg').classList.add('fill-silver');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize event listeners
  elements.gameMarksEl.forEach(mark => {
    mark.addEventListener('click', getUserChoiceHandler);
  });

  elements.restartBtn.addEventListener('click', restartHandler);
  elements.vsCpuBtn.addEventListener('click', setGameModeHandler);
  elements.vsPlayerBtn.addEventListener('click', setGameModeHandler);
  
  // Add CSS for X and O classes
  const style = document.createElement('style');
  style.textContent = `
    .gameplay__card.x::before {
      content: url('./assets/images/SVG/icon-x.svg');
    }
    
    .gameplay__card.o::before {
      content: url('./assets/images/SVG/icon-o.svg');
    }
    
    .gameplay__card.x.win {
      background-color: #31c3bd;
    }
    
    .gameplay__card.x.win::before {
      content: url('./assets/images/SVG/icon-x-win.svg');
    }
    
    .gameplay__card.o.win {
      background-color: #f2b137;
    }
    
    .gameplay__card.o.win::before {
      content: url('./assets/images/SVG/icon-o-win.svg');
    }
    
    .gameplay__board.x .gameplay__card:not(.x):not(.o):hover::before {
      content: url('./assets/images/SVG/icon-x-outline.svg');
    }
    
    .gameplay__board.o .gameplay__card:not(.x):not(.o):hover::before {
      content: url('./assets/images/SVG/icon-o-outline.svg');
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.4s ease-in-out;
    }
  `;
  document.head.appendChild(style);
});