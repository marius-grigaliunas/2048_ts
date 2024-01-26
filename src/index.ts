import { Grid, Cell } from "./grid.js";  
import Tile from "./tile.js";
import { setupKeyInput } from './keyInput.js';
import { setupTouchInput } from './touchInput.js';
import { setupMouseInput } from './mouseInput.js';
import { countScore } from "./input.js";

const gameContainer = document.querySelector<HTMLDivElement>('.game-container');
const score = <HTMLSpanElement>document.getElementById('score');
const restartBtn = <HTMLSpanElement>document.getElementById('restart');

let grid : Grid;

const startGame = () => {
    if(grid) {
        grid.delete;
        gameContainer?.innerHTML? gameContainer.innerHTML = "" : console.error('No game-container element');
    }
    
    if(gameContainer && score) {
        grid = new Grid(gameContainer);
        grid.randomEmptyCell().tile = new Tile(gameContainer);
        grid.randomEmptyCell().tile = new Tile(gameContainer);
    }

    if(grid && gameContainer && score) {
        countScore(grid, score);
        setupKeyInput(grid, gameContainer, score);
        setupMouseInput(grid, gameContainer, score);
        setupTouchInput(grid, gameContainer, score);
    }
};

restartBtn.addEventListener('click', startGame);
startGame();