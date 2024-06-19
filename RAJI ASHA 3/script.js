const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    if (gameState[cellIndex] || !isGameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusMessage.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
    } else if (gameState.every(cell => cell)) {
        statusMessage.textContent = "It's a Draw!";
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    isGameActive = true;
    statusMessage.textContent = `Player ${currentPlayer}'s Turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}
