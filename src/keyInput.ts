import { Grid } from './grid.js';
import { move } from './input.js';

let grid : Grid; 
let gameContainer : HTMLDivElement;
let score : HTMLSpanElement;


export const setupKeyInput = (gridImported : Grid, gameContainerImported : HTMLDivElement, scoreImported : HTMLSpanElement) => {
    
    grid = gridImported;
    gameContainer = gameContainerImported;
    score = scoreImported;

    window.addEventListener('keydown', handleInput, {once: true});
}


const handleInput  = async (event : KeyboardEvent) => {

    switch(true) {
        case (event.key === 'ArrowUp'):
            move(grid, "up", gameContainer, score);
            break;
        case (event.key === 'ArrowDown'):
            move(grid, "down", gameContainer, score);
            break;
        case (event.key === 'ArrowLeft'):
            move(grid, "left", gameContainer, score);
            break;
        case (event.key === 'ArrowRight'):
            move(grid, "right", gameContainer, score);
            break;
        default:
            setupKeyInput(grid, gameContainer, score);
            break;
    }

    setupKeyInput(grid, gameContainer, score);
}

