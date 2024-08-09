const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const FLAG = 'CTF{INSANE-FLAG-Tic-Tac-Toe}'; 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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

function checkWinningCondition(board, player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

app.post('/validate-win', (req, res) => {
    const { gameState } = req.body;

    if (checkWinningCondition(gameState, 'x')) {
        return res.json({ success: true, flag: FLAG });
    }

    return res.json({ success: false });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});