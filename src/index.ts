import Grid from "./grid.js";  
import Tile from "./tile.js";

const gameContainer = document.querySelector<HTMLDivElement>('.game-container');


if(gameContainer) {
    const grid = new Grid(gameContainer);
    console.log(grid);

    console.log(grid.randomEmptyCell());
} else {
    console.error("Game container not found");
}
