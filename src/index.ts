import { Grid, Cell } from "./grid.js";  
import Tile from "./tile.js";

const gameContainer = document.querySelector<HTMLDivElement>('.game-container');

const grid = gameContainer ? new Grid(gameContainer) : null;
const tile1 = gameContainer ? new Tile(gameContainer) : null;
if(grid && gameContainer) {
    grid.randomEmptyCell().tile = tile1;
    grid.randomEmptyCell().tile = new Tile(gameContainer);
}

const setupInput = () => {
  window.addEventListener('keydown', handleInput, {once: true});
}

const handleInput = (event : KeyboardEvent) => {
    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            setupInput();
            break;
    }


    setupInput();
}

const moveUp = () => {
    return slideTiles(grid?.cellsByColumn);
}

const moveDown = () => {
    return slideTiles(grid?.cellsByColumn.map(column => [...column].reverse()));
}

const moveLeft = () => {
    return slideTiles(grid?.cellsByRow);
}

const moveRight = () => {
    return slideTiles(grid?.cellsByRow.map(row  => [...row].reverse()));
}

const slideTiles = (cells : Cell[][] | undefined) => {
    cells?.forEach(group => {
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            let lastValidCell;
            for(let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j];
                if(!moveToCell.canAccept(cell.tile)) break;
                lastValidCell = moveToCell;
            }
            if(lastValidCell != null) {
                if(lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile;
                } else {
                    lastValidCell.tile = cell.tile;
                }
                cell.tile = null;
            }
        };
    });
}

setupInput();