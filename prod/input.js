var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Tile from './tile.js';
import { setupKeyInput } from './keyInput.js';
import { setupTouchInput } from './touchInput.js';
import { setupMouseInput } from './mouseInput.js';
const moveUp = (grid) => {
    return (grid === null || grid === void 0 ? void 0 : grid.cellsByColumn) ? slideTiles(grid.cellsByColumn) : console.error('no grid or cells By Column');
};
const moveDown = (grid) => {
    return (grid === null || grid === void 0 ? void 0 : grid.cellsByColumn) ? slideTiles(grid === null || grid === void 0 ? void 0 : grid.cellsByColumn.map(column => [...column].reverse()))
        : console.error('no grid or cells By Column');
};
const moveLeft = (grid) => {
    return (grid === null || grid === void 0 ? void 0 : grid.cellsByRow) ? slideTiles(grid === null || grid === void 0 ? void 0 : grid.cellsByRow) : console.error('no grid or cells By Row');
};
const moveRight = (grid) => {
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
const canMoveUp = (grid) => {
    if (grid && grid.cellsByColumn) {
        return canMove(grid.cellsByColumn);
    }
    else
        return console.error('no grid or cells By Column');
};
const canMoveDown = (grid) => {
    if (grid && grid.cellsByColumn) {
        return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
    }
    else
        return console.error('no grid or cells By Column');
};
const canMoveLeft = (grid) => {
    if (grid && grid.cellsByRow) {
        return canMove(grid.cellsByRow);
    }
    else
        return console.error('no grid or cells By Row');
};
const canMoveRight = (grid) => {
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
const check = (grid, gameContainer) => {
    if (grid && gameContainer) {
        grid === null || grid === void 0 ? void 0 : grid.cells.forEach((cell) => { cell.mergeTiles(); });
        const newTile = new Tile(gameContainer);
        grid.randomEmptyCell().tile = newTile;
        if (!canMoveUp(grid) && !canMoveDown(grid) && !canMoveLeft(grid) && !canMoveRight(grid)) {
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
export const countScore = (grid, score) => {
    if (score) {
        score.textContent = `${grid === null || grid === void 0 ? void 0 : grid.cells.reduce((accumulator, item) => { var _a; return accumulator + (((_a = item.tile) === null || _a === void 0 ? void 0 : _a.value) ? item.tile.value : 0); }, 0)}`;
    }
    else {
        console.error('No score element');
    }
};
export const move = (grid, direction, gameContainer, score) => __awaiter(void 0, void 0, void 0, function* () {
    switch (direction) {
        case 'up':
            if (!canMoveUp(grid)) {
                setupKeyInput(grid, gameContainer, score);
                setupTouchInput(grid, gameContainer, score);
                setupMouseInput(grid, gameContainer, score);
                return;
            }
            yield moveUp(grid);
            check(grid, gameContainer);
            break;
        case 'down':
            if (!canMoveDown(grid)) {
                setupKeyInput(grid, gameContainer, score);
                setupTouchInput(grid, gameContainer, score);
                setupMouseInput(grid, gameContainer, score);
                return;
            }
            yield moveDown(grid);
            check(grid, gameContainer);
            break;
        case 'left':
            if (!canMoveLeft(grid)) {
                setupKeyInput(grid, gameContainer, score);
                setupTouchInput(grid, gameContainer, score);
                setupMouseInput(grid, gameContainer, score);
                return;
            }
            yield moveLeft(grid);
            check(grid, gameContainer);
            break;
        case 'right':
            if (!canMoveRight(grid)) {
                setupKeyInput(grid, gameContainer, score);
                setupTouchInput(grid, gameContainer, score);
                setupMouseInput(grid, gameContainer, score);
                return;
            }
            yield moveRight(grid);
            check(grid, gameContainer);
            break;
        default:
            setupKeyInput(grid, gameContainer, score);
            setupMouseInput(grid, gameContainer, score);
            setupTouchInput(grid, gameContainer, score);
            break;
    }
    countScore(grid, score);
});
