const GRID_SIZE = "4";
const CELL_SIZE = "20";
const CELL_GAP = "2";
export class Grid {
    constructor(containerElement) {
        this.randomEmptyCell = () => {
            const randomIndex = Math.floor(Math.random() * this.emptyCells.length);
            return this.emptyCells[randomIndex];
        };
        containerElement.style.setProperty("--grid-size", GRID_SIZE);
        containerElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        containerElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        this._cells = createCellElements(containerElement).map((cellElement, index) => {
            return new Cell(cellElement, index % +GRID_SIZE, Math.floor(index / +GRID_SIZE));
        });
    }
    get cells() {
        return this._cells;
    }
    get cellsByColumn() {
        return this._cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }
    get cellsByRow() {
        return this._cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, []);
    }
    get emptyCells() {
        return this._cells.filter((cell) => cell.tile == null);
    }
}
export class Cell {
    constructor(element, x, y) {
        this._element = element;
        this._x = x;
        this._y = y;
        this._tile = null;
        this._mergeTile = null;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get tile() {
        return this._tile;
    }
    set tile(value) {
        this._tile = value;
        if (value === null) {
            return;
        }
        if (this._tile) {
            this._tile.x = this._x;
            this._tile.y = this._y;
        }
    }
    get mergeTile() {
        return this._mergeTile;
    }
    set mergeTile(value) {
        this._mergeTile = value;
        if (value == null)
            return;
        if (this._mergeTile) {
            this._mergeTile.x = this._x;
            this._mergeTile.y = this._y;
        }
    }
    canAccept(tile) {
        return (this.tile == null ||
            (this.mergeTile == null && this.tile.value === (tile === null || tile === void 0 ? void 0 : tile.value)));
    }
    mergeTiles() {
        if (this.mergeTile == null || this.tile == null)
            return;
        this.tile.value += this.mergeTile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
    }
}
const createCellElements = (containerElement) => {
    const cellArray = [];
    for (let i = 0; i < +GRID_SIZE * +GRID_SIZE; i++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        // cellElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        // cellElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        containerElement.appendChild(cellElement);
        cellArray.push(cellElement);
    }
    return cellArray;
};
