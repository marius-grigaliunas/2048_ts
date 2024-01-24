import Grid from "./grid.js";
const gameContainer = document.querySelector('.game-container');
if (gameContainer) {
    const grid = new Grid(gameContainer);
}
else {
    console.error("Game container not found");
}
