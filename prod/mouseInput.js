import { move } from './input.js';
let grid;
let gameContainer;
let score;
let xStart = -1;
let yStart = -1;
export const setupMouseInput = (gridImported, gameContainerImported, scoreImported) => {
    grid = gridImported;
    gameContainer = gameContainerImported;
    score = scoreImported;
    gameContainer.addEventListener("mousedown", handleMouseStart, false);
    gameContainer.addEventListener("mousemove", handleMouseMove, false);
};
const handleMouseStart = (event) => {
    xStart = event.clientX;
    yStart = event.clientY;
};
const handleMouseMove = (event) => {
    event.preventDefault();
    if (xStart !== -1 || yStart !== -1) {
        const xEnd = event.clientX;
        const yEnd = event.clientY;
        if (Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd)) {
            if (xEnd - xStart > 0) {
                move(grid, 'right', gameContainer, score);
            }
            else {
                move(grid, 'left', gameContainer, score);
            }
        }
        else {
            if (yEnd - yStart > 0) {
                move(grid, 'down', gameContainer, score);
            }
            else {
                move(grid, 'up', gameContainer, score);
            }
        }
        xStart = -1;
        yStart = -1;
    }
    setupMouseInput(grid, gameContainer, score);
};
