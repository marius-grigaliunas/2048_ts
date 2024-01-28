import { Grid, Cell } from './grid.js';
import Tile from './tile.js';
import { setupKeyInput } from './keyInput.js';
import { setupTouchInput } from './touchInput.js';
import { setupMouseInput } from './mouseInput.js';

const moveUp = (grid : Grid) => {
    return grid?.cellsByColumn ? slideTiles(grid.cellsByColumn) : console.error('no grid or cells By Column');
}

const moveDown = (grid : Grid) => {
    return grid?.cellsByColumn ? slideTiles(grid?.cellsByColumn.map(column => [...column].reverse()))
    : console.error('no grid or cells By Column');
}

const moveLeft = (grid : Grid) => {
    return grid?.cellsByRow ? slideTiles(grid?.cellsByRow) : console.error('no grid or cells By Row');
}

const moveRight = (grid : Grid) => {
    return grid?.cellsByRow ? slideTiles(grid?.cellsByRow.map(row  => [...row].reverse())) 
    : console.error('no grid or cells By Row');
}

const slideTiles = (cells: Cell[][]) => {
    return Promise.all<unknown>(
        cells?.flatMap((group) => {
            const promises : Promise<unknown>[] = [];
            for (let i = 1; i < group.length; i++) {
                const cell = group[i];
                let lastValidCell;
                for(let j = i - 1; j >= 0; j--) {
                    const moveToCell = group[j];
                    if(!moveToCell.canAccept(cell.tile)) break;
                    lastValidCell = moveToCell;
                }
                if(lastValidCell != null) {
                    cell. tile ? promises.push(cell.tile.waitForTransition()) : "";
                    if(lastValidCell.tile != null) {
                        lastValidCell.mergeTile = cell.tile;
                    } else {
                        lastValidCell.tile = cell.tile;
                    }
                    cell.tile = null;
                }
            }
            return promises;
        }),
    );
};

const canMoveUp = (grid : Grid) => {
    if(grid &&  grid.cellsByColumn) {
        return canMove(grid.cellsByColumn);
    }
    else
        return console.error('no grid or cells By Column');
};

const canMoveDown = (grid : Grid) => {
    if(grid &&  grid.cellsByColumn) {
        return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
    }
    else
        return console.error('no grid or cells By Column');
};

const canMoveLeft = (grid : Grid) => {
    if(grid &&  grid.cellsByRow) {
        return canMove(grid.cellsByRow);
    }
    else
        return console.error('no grid or cells By Row');
};

const canMoveRight = (grid : Grid) => {
    if(grid &&  grid.cellsByRow) {
        return canMove(grid.cellsByRow.map(row  => [...row].reverse()));
    }
    else
        return console.error('no grid or cells By Row');
};


const canMove = (cells : Cell[][]) => {
    return cells.some(group => {
        return group.some((cell, index) => {
            if(index === 0) return false;
            if(cell.tile == null) return false;
            const moveToCell = group[index - 1];
            return moveToCell.canAccept(cell.tile);
        })
    })
}

const check = (grid : Grid, gameContainer : HTMLDivElement) => {
    if(grid && gameContainer) {
        grid?.cells.forEach((cell) => {cell.mergeTiles()});
        const newTile = new Tile(gameContainer);
        grid.randomEmptyCell().tile = newTile;
        if(!canMoveUp(grid) && !canMoveDown(grid) && !canMoveLeft(grid) && !canMoveRight(grid)) {
            newTile?.waitForTransition(true).then(() => {
                alert("Game Over!");
            });
            return;
        }
    } else {
        console.error('No game-container element');
    }
}

export const countScore = (grid : Grid, score : HTMLSpanElement) => {
    if(score) {
        score.textContent = `${grid?.cells.reduce((accumulator : number, item : Cell) => accumulator + (item.tile?.value ? item.tile.value : 0), 0)}`;
    } else {
        console.error('No score element');
    }
};

export const move = async (grid: Grid, direction : string, gameContainer : HTMLDivElement, score : HTMLSpanElement) => {
    switch(direction) {
        case 'up':
            if(!canMoveUp(grid)){
                setupKeyInput(grid, gameContainer, score);
                setupTouchInput(grid, gameContainer, score);
                setupMouseInput(grid, gameContainer, score);
                return;
            }
            await moveUp(grid);
            check(grid, gameContainer);
            break;
        case 'down':
            if(!canMoveDown(grid)){
                setupKeyInput(grid, gameContainer, score);
                setupTouchInput(grid, gameContainer, score);
                setupMouseInput(grid, gameContainer, score);
                return;
            }
            await moveDown(grid);
            check(grid, gameContainer);
            break;
        case 'left':
            if(!canMoveLeft(grid)){
                setupKeyInput(grid, gameContainer, score);
                setupTouchInput(grid, gameContainer, score);
                setupMouseInput(grid, gameContainer, score);                
                return;
            }
            await moveLeft(grid);
            check(grid, gameContainer);
            break;
        case 'right':
            if(!canMoveRight(grid)){
                setupKeyInput(grid, gameContainer, score);
                setupTouchInput(grid, gameContainer, score);
                setupMouseInput(grid, gameContainer, score);                
                return;
            }
            await moveRight(grid);
            check(grid, gameContainer);
            break;
        default:
            setupKeyInput(grid, gameContainer, score);
            setupMouseInput(grid, gameContainer, score);
            setupTouchInput(grid, gameContainer, score);
            break;
    }

    countScore(grid, score);
};