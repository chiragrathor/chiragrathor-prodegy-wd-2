document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('game-container');
    const message = document.getElementById('message');

    let currentPlayer = 'X';
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function createBoard() {
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            row.setAttribute('data-row', i);
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-col', j);
                cell.setAttribute('data-row', i);
                cell.addEventListener('click', handleCellClick);
                row.appendChild(cell);
            }
            container.appendChild(row);
        }
    }

    function handleCellClick(event) {
        const row = event.target.getAttribute('data-row');
        const col = event.target.getAttribute('data-col');

        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            event.target.innerText = currentPlayer;

            if (checkForWinner()) {
                message.innerText = `Player ${currentPlayer} wins!`;
                container.removeEventListener('click', handleCellClick);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkForWinner() {
        // Check rows, columns, and diagonals for a winner
        for (let i = 0; i < 3; i++) {
            if (
                (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) ||
                (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer)
            ) {
                return true;
            }
        }

        if (
            (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
            (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)
        ) {
            return true;
        }

        return false;
    }

    createBoard();
});