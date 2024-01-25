var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Grid } from "./grid.js";
import Tile from "./tile.js";
const gameContainer = document.querySelector('.game-container');
const score = document.getElementById('score');
const restart = document.getElementById('restart');
let grid = gameContainer ? new Grid(gameContainer) : null;
const tile1 = gameContainer ? new Tile(gameContainer) : null;
if (grid && gameContainer) {
    grid.randomEmptyCell().tile = tile1;
}
const setupInput = () => {
    window.addEventListener('keydown', handleInput, { once: true });
};
const handleInput = (event) => __awaiter(void 0, void 0, void 0, function* () {
    countScore();
    switch (event.key) {
        case 'ArrowUp':
            if (!canMoveUp()) {
                setupInput();
                return;
            }
            yield moveUp();
            check();
            break;
        case 'ArrowDown':
            if (!canMoveDown()) {
                setupInput();
                return;
            }
            yield moveDown();
            check();
            break;
        case 'ArrowLeft':
            if (!canMoveLeft()) {
                setupInput();
                return;
            }
            yield moveLeft();
            check();
            break;
        case 'ArrowRight':
            if (!canMoveRight()) {
                setupInput();
                return;
            }
            yield moveRight();
            check();
            break;
        default:
            setupInput();
            break;
    }
    countScore();
    setupInput();
});
const moveUp = () => {
    return (grid === null || grid === void 0 ? void 0 : grid.cellsByColumn) ? slideTiles(grid.cellsByColumn) : console.error('no grid or cells By Column');
};
const moveDown = () => {
    return (grid === null || grid === void 0 ? void 0 : grid.cellsByColumn) ? slideTiles(grid === null || grid === void 0 ? void 0 : grid.cellsByColumn.map(column => [...column].reverse()))
        : console.error('no grid or cells By Column');
};
const moveLeft = () => {
    return (grid === null || grid === void 0 ? void 0 : grid.cellsByRow) ? slideTiles(grid === null || grid === void 0 ? void 0 : grid.cellsByRow) : console.error('no grid or cells By Row');
};
const moveRight = () => {
    return (grid === null || grid === void 0 ? void 0 : grid.cellsByRow) ? slideTiles(grid === null || grid === void 0 ? void 0 : grid.cellsByRow.map(row => [...row].reverse()))
        : console.error('no grid or cells By Row');
};
const slideTiles = (cells) => {
    return Promise.all(cells === null || cells === void 0 ? void 0 : cells.flatMap((group) => {
        const promises = [];
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            let lastValidCell;
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j];
                if (!moveToCell.canAccept(cell.tile))
                    break;
                lastValidCell = moveToCell;
            }
            if (lastValidCell != null) {
                cell.tile ? promises.push(cell.tile.waitForTransition()) : "";
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile;
                }
                else {
                    lastValidCell.tile = cell.tile;
                }
                cell.tile = null;
            }
        }
        return promises;
    }));
};
const canMoveUp = () => {
    if (grid && grid.cellsByColumn) {
        return canMove(grid.cellsByColumn);
    }
    else
        return console.error('no grid or cells By Column');
};
const canMoveDown = () => {
    if (grid && grid.cellsByColumn) {
        return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
    }
    else
        return console.error('no grid or cells By Column');
};
const canMoveLeft = () => {
    if (grid && grid.cellsByRow) {
        return canMove(grid.cellsByRow);
    }
    else
        return console.error('no grid or cells By Row');
};
const canMoveRight = () => {
    if (grid && grid.cellsByRow) {
        return canMove(grid.cellsByRow.map(row => [...row].reverse()));
    }
    else
        return console.error('no grid or cells By Row');
};
const canMove = (cells) => {
    return cells.some(group => {
        return group.some((cell, index) => {
            if (index === 0)
                return false;
            if (cell.tile == null)
                return false;
            const moveToCell = group[index - 1];
            return moveToCell.canAccept(cell.tile);
        });
    });
};
const check = () => {
    if (grid && gameContainer) {
        grid === null || grid === void 0 ? void 0 : grid.cells.forEach((cell) => { cell.mergeTiles(); });
        const newTile = new Tile(gameContainer);
        grid.randomEmptyCell().tile = newTile;
        if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
            newTile === null || newTile === void 0 ? void 0 : newTile.waitForTransition(true).then(() => {
                alert("Game Over!");
            });
            return;
        }
    }
    else {
        console.error('No game-container element');
    }
};
const countScore = () => {
    if (score) {
        score.textContent = `${grid === null || grid === void 0 ? void 0 : grid.cells.reduce((accumulator, item) => { var _a; return accumulator + (((_a = item.tile) === null || _a === void 0 ? void 0 : _a.value) ? item.tile.value : 0); }, 0)}`;
    }
    else {
        console.error('No score element');
    }
};
const startGame = () => {
    const grid = gameContainer ? new Grid(gameContainer) : null;
    const tile1 = gameContainer ? new Tile(gameContainer) : null;
    if (grid && gameContainer) {
        grid.randomEmptyCell().tile = tile1;
    }
};
restart.addEventListener('click', () => {
    grid === null || grid === void 0 ? void 0 : grid.delete;
    (gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.innerHTML) ? gameContainer.innerHTML = "" : console.error('No game-container element');
    grid = gameContainer ? new Grid(gameContainer) : null;
    const tile1 = gameContainer ? new Tile(gameContainer) : null;
    if (grid && gameContainer) {
        grid.randomEmptyCell().tile = tile1;
    }
    countScore();
    console.log("new");
});
countScore();
setupInput();
