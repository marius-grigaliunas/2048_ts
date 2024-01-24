import Grid from "./grid.js";  

const gameContainer = document.querySelector<HTMLDivElement>('.game-container');

if(gameContainer) {
    const grid = new Grid(gameContainer);
} else {
    console.error("Game container not found");
}