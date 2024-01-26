import { Grid } from "./grid.js";
import Tile from "./tile.js";
import { setupKeyInput } from './keyInput.js';
import { setupTouchInput } from './touchInput.js';
import { setupMouseInput } from './mouseInput.js';
import { countScore } from "./input.js";
const gameContainer = document.querySelector('.game-container');
const score = document.getElementById('score');
const restartBtn = document.getElementById('restart');
let grid;
const startGame = () => {
    if (grid) {
        grid.delete;
        (gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.innerHTML) ? gameContainer.innerHTML = "" : console.error('No game-container element');
    }
    if (gameContainer && score) {
        grid = new Grid(gameContainer);
        grid.randomEmptyCell().tile = new Tile(gameContainer);
        grid.randomEmptyCell().tile = new Tile(gameContainer);
    }
    if (grid && gameContainer && score) {
        countScore(grid, score);
        setupKeyInput(grid, gameContainer, score);
        setupMouseInput(grid, gameContainer, score);
        setupTouchInput(grid, gameContainer, score);
    }
};
restartBtn.addEventListener('click', startGame);
startGame();
