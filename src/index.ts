import { Grid, Cell } from "./grid.js";  
import Tile from "./tile.js";

const gameContainer = document.querySelector<HTMLDivElement>('.game-container');
const score = <HTMLSpanElement>document.getElementById('score');
const restart = <HTMLSpanElement>document.getElementById('restart');

let grid = gameContainer ? new Grid(gameContainer) : null;
const tile1 = gameContainer ? new Tile(gameContainer) : null;
if(grid && gameContainer) {
    grid.randomEmptyCell().tile = tile1;
}


const swipes = {
    up: false,
    down: false,
    left: false,
    right: false,
}

const setupInput = () => {
  window.addEventListener('keydown', handleInput, {once: true});
}

const handleInput  = async (event : KeyboardEvent) => {
    
    countScore();

    switch(true) {
        case (event.key === 'ArrowUp'):
            move("up");
            break;
        case (event.key === 'ArrowDown'):
            move("down");
            break;
        case (event.key === 'ArrowLeft'):
            move("left");
            break;
        case (event.key === 'ArrowRight'):
            move("right");
            break;
        default:
            setupInput();
            break;
    }

    countScore();
    setupInput();
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

const check = () => {
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
    } else {
        console.error('No game-container element');
    }
}

const countScore = () => {
    if(score) {
        score.textContent = `${grid?.cells.reduce((accumulator : number, item : Cell) => accumulator + (item.tile?.value ? item.tile.value : 0), 0)}`;
    } else {
        console.error('No score element');
    }
};

const move = async (direction : string) => {
    switch(direction) {
        case 'up':
            if(!canMoveUp()){
                setupInput();
                return;
            }
            await moveUp();
            check();
            break;
        case 'down':
            if(!canMoveDown()){
                setupInput();
                return;
            }
            await moveDown();
            check();
            break;
        case 'left':
            if(!canMoveLeft()){
                setupInput();
                return;
            }
            await moveLeft();
            check();
            break;
        case 'right':
            if(!canMoveRight()){
                setupInput();
                return;
            }
            await moveRight();
            check();
            break;
        default:
            setupInput();
            break;
    }
};

restart.addEventListener('click', () => {
    grid?.delete;
    gameContainer?.innerHTML ? gameContainer.innerHTML = "" : console.error('No game-container element');

    grid = gameContainer ? new Grid(gameContainer) : null;
    const tile1 = gameContainer ? new Tile(gameContainer) : null;
    if(grid && gameContainer) {
        grid.randomEmptyCell().tile = tile1;
    }

    countScore();
    console.log("new");
});

let xStart = -1;
let yStart = -1;

const handleTouchStart = (event : TouchEvent) => {
    const touchDown = event.touches[0];
    xStart = touchDown.clientX;
    yStart = touchDown.clientY;
};



const handleTouchMove = (event : TouchEvent) => {
    if(xStart !== -1 || yStart !== -1) {
        const touchMove = event.touches[0];
        const xEnd = touchMove.clientX;
        const yEnd = touchMove.clientY;
        
        if(Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd)) {
            if(xEnd - xStart > 0) {
                move('right');
            } else {
                move('left');
            }
        } else {
            if(yEnd - yStart > 0) {
                move('down');
            } else {
                move('up');
            }
        }

        xStart = -1;
        yStart = -1;
    }
};

const handleMouseStart = (event : MouseEvent) => {
    xStart = event.clientX;
    yStart = event.clientY;
};

const handleMouseMove = (event : MouseEvent) => {
    event.preventDefault();

    if(xStart !== -1 || yStart !== -1) {
        const xEnd = event.clientX;
        const yEnd = event.clientY;
        
        if(Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd)) {
            if(xEnd - xStart > 0) {
                move('right');
            } else {
                move('left');
            }
        } else {
            if(yEnd - yStart > 0) {
                move('down');
            } else {
                move('up');
            }
        }

        xStart = -1;
        yStart = -1;
    }
};


document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

document.addEventListener("mousedown", handleMouseStart, false);
document.addEventListener("mousemove", handleMouseMove, false);

countScore();
setupInput();