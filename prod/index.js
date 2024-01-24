import Grid from "./grid.js";
const gameContainer = document.querySelector('.game-container');
if (gameContainer) {
    const grid = new Grid(gameContainer);
    console.log(grid);
    console.log(grid.randomEmptyCell());
}
else {
    console.error("Game container not found");
}
