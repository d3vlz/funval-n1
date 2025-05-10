/**
 * Tic Tac Toe Game Tests
 * Simple unit tests for the Tic Tac Toe game logic
 * 
 * To run these tests:
 * 1. Include this file after app.js
 * 2. Open the console to see test results
 */

// Mock DOM elements for testing
function setupMockDOM() {
  // Create mock elements
  document.body.innerHTML = `
    <div id="game-start"></div>
    <div id="gameplay"></div>
    <div id="game-start-marks">
      <div id="x"></div>
      <div id="o"></div>
    </div>
    <div id="gameplay-board"></div>
    <div id="modal"></div>
    <div id="backdrop"></div>
    <div id="opponent-message"></div>
    <div class="gameplay__card"></div>
    <div class="gameplay__card"></div>
    <div class="gameplay__card"></div>
    <div class="gameplay__card"></div>
    <div class="gameplay__card"></div>
    <div class="gameplay__card"></div>
    <div class="gameplay__card"></div>
    <div class="gameplay__card"></div>
    <div class="gameplay__card"></div>
    <div id="x-win"><span id="x-win-inner"></span></div>
    <div id="tie"><span id="tie-inner"></span></div>
    <div id="o-win"><span id="o-win-inner"></span></div>
    <div id="gameplay-turn"></div>
  `;
}

// Test framework
const TicTacToeTests = {
  tests: [],
  
  /**
   * Add a test case
   * @param {string} name - Test name
   * @param {Function} testFn - Test function
   */
  addTest(name, testFn) {
    this.tests.push({ name, testFn });
  },
  
  /**
   * Run all tests
   */
  runTests() {
    console.log('%c Tic Tac Toe Game Tests ', 'background: #333; color: #fff; padding: 5px;');
    let passed = 0;
    let failed = 0;
    
    this.tests.forEach(test => {
      try {
        // Setup DOM for each test
        setupMockDOM();
        
        // Run the test
        test.testFn();
        
        console.log(`%c ✓ ${test.name}`, 'color: green');
        passed++;
      } catch (error) {
        console.log(`%c ✗ ${test.name}`, 'color: red');
        console.error(`  Error: ${error.message}`);
        failed++;
      }
    });
    
    console.log(`%c Results: ${passed} passed, ${failed} failed`, 'font-weight: bold');
  },
  
  /**
   * Assert that a condition is true
   * @param {boolean} condition - Condition to check
   * @param {string} message - Error message if condition is false
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  },
  
  /**
   * Assert that two values are equal
   * @param {*} actual - Actual value
   * @param {*} expected - Expected value
   * @param {string} message - Error message if values are not equal
   */
  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
  }
};

// Test cases
TicTacToeTests.addTest('Game state initialization', () => {
  // Reset game state
  Object.assign(gameState, {
    currentPlayerMark: O_CLASS,
    isVsPlayer: false,
    oTurn: false,
    xWin: 0,
    oWin: 0,
    tie: 0,
    winningArray: null,
    currentClass: null,
  });
  
  // Check initial state
  TicTacToeTests.assertEqual(gameState.currentPlayerMark, O_CLASS, 'Initial player mark should be O');
  TicTacToeTests.assertEqual(gameState.isVsPlayer, false, 'Initial game mode should be vs CPU');
  TicTacToeTests.assertEqual(gameState.oTurn, false, 'Initial turn should be X');
  TicTacToeTests.assertEqual(gameState.xWin, 0, 'Initial X wins should be 0');
  TicTacToeTests.assertEqual(gameState.oWin, 0, 'Initial O wins should be 0');
  TicTacToeTests.assertEqual(gameState.tie, 0, 'Initial ties should be 0');
});

TicTacToeTests.addTest('Check win detection - horizontal', () => {
  // Setup horizontal win for X (top row)
  elements.cells = document.querySelectorAll('.gameplay__card');
  elements.cells[0].classList.add(X_CLASS);
  elements.cells[1].classList.add(X_CLASS);
  elements.cells[2].classList.add(X_CLASS);
  
  // Check for win
  const isWin = checkWin(X_CLASS);
  TicTacToeTests.assert(isWin, 'Should detect horizontal win for X');
  TicTacToeTests.assert(gameState.winningArray, 'Should set winningArray');
});

TicTacToeTests.addTest('Check win detection - vertical', () => {
  // Setup vertical win for O (left column)
  elements.cells = document.querySelectorAll('.gameplay__card');
  elements.cells[0].classList.add(O_CLASS);
  elements.cells[3].classList.add(O_CLASS);
  elements.cells[6].classList.add(O_CLASS);
  
  // Check for win
  const isWin = checkWin(O_CLASS);
  TicTacToeTests.assert(isWin, 'Should detect vertical win for O');
});

TicTacToeTests.addTest('Check win detection - diagonal', () => {
  // Setup diagonal win for X (top-left to bottom-right)
  elements.cells = document.querySelectorAll('.gameplay__card');
  elements.cells[0].classList.add(X_CLASS);
  elements.cells[4].classList.add(X_CLASS);
  elements.cells[8].classList.add(X_CLASS);
  
  // Check for win
  const isWin = checkWin(X_CLASS);
  TicTacToeTests.assert(isWin, 'Should detect diagonal win for X');
});

TicTacToeTests.addTest('Check draw detection', () => {
  // Setup a draw scenario
  elements.cells = document.querySelectorAll('.gameplay__card');
  
  // X | O | X
  // O | X | O
  // O | X | O
  elements.cells[0].classList.add(X_CLASS);
  elements.cells[1].classList.add(O_CLASS);
  elements.cells[2].classList.add(X_CLASS);
  elements.cells[3].classList.add(O_CLASS);
  elements.cells[4].classList.add(X_CLASS);
  elements.cells[5].classList.add(O_CLASS);
  elements.cells[6].classList.add(O_CLASS);
  elements.cells[7].classList.add(X_CLASS);
  elements.cells[8].classList.add(O_CLASS);
  
  // Check for draw
  const isDraw = isDraw();
  TicTacToeTests.assert(isDraw, 'Should detect draw');
});

TicTacToeTests.addTest('Turn swapping', () => {
  // Setup initial state
  gameState.oTurn = false;
  
  // Swap turns
  swapTurns();
  TicTacToeTests.assertEqual(gameState.oTurn, true, 'Turn should swap from X to O');
  
  // Swap turns again
  swapTurns();
  TicTacToeTests.assertEqual(gameState.oTurn, false, 'Turn should swap from O to X');
});

TicTacToeTests.addTest('Empty cells detection', () => {
  // Setup board with some filled cells
  elements.cells = document.querySelectorAll('.gameplay__card');
  elements.cells[0].classList.add(X_CLASS);
  elements.cells[4].classList.add(O_CLASS);
  
  // Get empty cells
  const emptyCells = getEmptyCells();
  TicTacToeTests.assertEqual(emptyCells.length, 7, 'Should detect 7 empty cells');
});

// Run tests when included on a page with app.js
document.addEventListener('DOMContentLoaded', () => {
  // Only run tests if we're in a testing environment
  if (window.location.search.includes('runTests=true')) {
    TicTacToeTests.runTests();
  }
});