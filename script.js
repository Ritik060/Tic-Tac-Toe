const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winnerMessage');
const closeBtn = document.getElementById('close');
const restartPopupBtn = document.getElementById('restartPopup');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
});

restartBtn.addEventListener('click', restartGame);
closeBtn.addEventListener('click', closePopup);
restartPopupBtn.addEventListener('click', restartGame);

function cellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showPopup(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        showPopup("It's a draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function showPopup(message) {
    winnerMessage.textContent = message;
    popup.style.display = 'flex';
}

function closePopup() {
    popup.style.display = 'none';
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    closePopup();
}
