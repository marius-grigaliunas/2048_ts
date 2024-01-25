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

const handleInput  = async (event : KeyboardEvent) => {
    switch(event.key) {
        case 'ArrowUp':
            if(!canMoveUp()){
                setupInput();
                return;
            }
            await moveUp();
            break;
        case 'ArrowDown':
            if(!canMoveDown()){
                setupInput();
                return;
            }
            await moveDown();
            break;
        case 'ArrowLeft':
            if(!canMoveLeft()){
                setupInput();
                return;
            }
            await moveLeft();
            break;
        case 'ArrowRight':
            if(!canMoveRight()){
                setupInput();
                return;
            }
            await moveRight();
            break;
        default:
            setupInput();
            break;
    }

    if(grid && gameContainer) {
        grid?.cells.forEach((cell) => {cell.mergeTiles()});
        const newTile = new Tile(gameContainer);
        grid.randomEmptyCell().tile = newTile;
        if(!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
            newTile?.waitForTransition(true).then(() => {
                alert("Game Over!");
            });
            return;
        }

        setupInput();
    } else {
        console.error('No game-container element');
    }
}

const moveUp = () => {
    return grid?.cellsByColumn ? slideTiles(grid.cellsByColumn) : console.error('no grid or cells By Column');
}

const moveDown = () => {
    return grid?.cellsByColumn ? slideTiles(grid?.cellsByColumn.map(column => [...column].reverse()))
    : console.error('no grid or cells By Column');
}

const moveLeft = () => {
    return grid?.cellsByRow ? slideTiles(grid?.cellsByRow) : console.error('no grid or cells By Row');
}

const moveRight = () => {
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

const canMoveUp = () => {
    if(grid &&  grid.cellsByColumn) {
        return canMove(grid.cellsByColumn);
    }
    else
        return console.error('no grid or cells By Column');
};

const canMoveDown = () => {
    if(grid &&  grid.cellsByColumn) {
        return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
    }
    else
        return console.error('no grid or cells By Column');
};

const canMoveLeft = () => {
    if(grid &&  grid.cellsByRow) {
        return canMove(grid.cellsByRow);
    }
    else
        return console.error('no grid or cells By Row');
};

const canMoveRight = () => {
    if(grid &&  grid.cellsByRow) {
        return canMove(grid.cellsByRow.map(row  => [...row].reverse()));
    }
    else
        return console.error('no grid or cells By Row');
};


const canMove = (cells : Cell[][]) =>{
    return cells.some(group => {
        return group.some((cell, index) => {
            if(index === 0) return false;
            if(cell.tile == null) return false;
            const moveToCell = group[index - 1];
            return moveToCell.canAccept(cell.tile);
        })
    })
}

setupInput();