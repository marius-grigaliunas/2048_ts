import { move } from './input.js';
let grid;
let gameContainer;
let score;
let xStart = -1;
let yStart = -1;
export const setupTouchInput = (gridImported, gameContainerImported, scoreImported) => {
    grid = gridImported;
    gameContainer = gameContainerImported;
    score = scoreImported;
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
};
const handleTouchStart = (event) => {
    event.preventDefault();
    const touchDown = event.touches[0];
    xStart = touchDown.clientX;
    yStart = touchDown.clientY;
};
const handleTouchMove = (event) => {
    event.preventDefault();
    if (xStart !== -1 || yStart !== -1) {
        const touchMove = event.touches[0];
        const xEnd = touchMove.clientX;
        const yEnd = touchMove.clientY;
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
    setupTouchInput(grid, gameContainer, score);
};
