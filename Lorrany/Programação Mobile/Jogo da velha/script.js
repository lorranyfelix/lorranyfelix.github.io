document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('board');
  const restartButton = document.getElementById('restartButton');
  const currentPlayerDisplay = document.getElementById('current-player');
  const gameStatusDisplay = document.getElementById('game-status');
  const playerXScoreDisplay = document.getElementById('playerXScore').querySelector('span');
  const playerOScoreDisplay = document.getElementById('playerOScore').querySelector('span');

  const X_CLASS = 'X';
  const O_CLASS = 'O';
  let currentPlayerClass = X_CLASS;
  let gameActive = true;
  let playerXScore = 0;
  let playerOScore = 0;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const cells = document.querySelectorAll('[data-cell]');

  startGame();

  restartButton.addEventListener('click', startGame);

  function startGame() {
    currentPlayerClass = X_CLASS;
    gameActive = true;
    gameStatusDisplay.innerText = '';
    currentPlayerDisplay.innerText = currentPlayerClass;
    cells.forEach(cell => {
      cell.innerText = '';
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      cell.addEventListener('click', handleClick, { once: true });
    });
  }

  function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.innerText !== '') return;

    placeMark(cell, currentPlayerClass);

    if (checkWin(currentPlayerClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
    }
  }

  function endGame(draw) {
    gameActive = false;
    if (draw) {
      gameStatusDisplay.innerText = 'Empate!';
    } else {
      const winner = currentPlayerClass === X_CLASS ? 'X' : 'O';
      gameStatusDisplay.innerText = `${winner} venceu!`;
      updateScore(winner);
    }
  }

  function isDraw() {
    return [...cells].every(cell => {
      return cell.innerText !== '';
    });
  }

  function placeMark(cell, currentClass) {
    cell.innerText = currentClass;
    cell.classList.add(currentClass);
  }

  function swapTurns() {
    currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
    currentPlayerDisplay.innerText = currentPlayerClass;
  }

  function checkWin(currentClass) {
    return winningCombos.some(combination => {
      return combination.every(index => {
        return cells[index].classList.contains(currentClass);
      });
    });
  }

  function updateScore(winner) {
    if (winner === 'X') {
      playerXScore++;
      playerXScoreDisplay.innerText = playerXScore;
    } else {
      playerOScore++;
      playerOScoreDisplay.innerText = playerOScore;
    }
  }
});
