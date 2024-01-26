import { Grid } from './grid.js';
import { move } from './input.js';

let grid : Grid; 
let gameContainer : HTMLDivElement;
let score : HTMLSpanElement;

let xStart = -1;
let yStart = -1;

export const setupMouseInput = (gridImported : Grid, gameContainerImported : HTMLDivElement, scoreImported : HTMLSpanElement) => {
    grid = gridImported;
    gameContainer = gameContainerImported;
    score = scoreImported;
    
    document.addEventListener("mousedown", handleMouseStart, false);
    document.addEventListener("mousemove", handleMouseMove, false);
};

const handleMouseStart = (event : MouseEvent) => {
    xStart = event.clientX;
    yStart = event.clientY;
};

const handleMouseMove = (event : MouseEvent) => {
    event.preventDefault();

    if(xStart !== -1 || yStart !== -1) {
        const xEnd = event.clientX;
        const yEnd = event.clientY;
        
        if(Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd)) {
            if(xEnd - xStart > 0) {
                move(grid, 'right', gameContainer, score);
            } else {
                move(grid, 'left', gameContainer, score);
            }
        } else {
            if(yEnd - yStart > 0) {
                move(grid, 'down', gameContainer, score);
            } else {
                move(grid, 'up', gameContainer, score);
            }
        }

        xStart = -1;
        yStart = -1;
    }

    setupMouseInput(grid, gameContainer, score);
};