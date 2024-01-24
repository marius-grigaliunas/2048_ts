import Tile from "./tile.js";

const GRID_SIZE = "4";
const CELL_SIZE = "20";
const CELL_GAP = "2";

export class Grid {
    private _cells : Cell[];

    constructor(containerElement: HTMLDivElement) {
        containerElement.style.setProperty("--grid-size", GRID_SIZE);
        containerElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        containerElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

        this._cells = createCellElements(containerElement).map((cellElement : HTMLDivElement, index: number) => {
            return new Cell(
                cellElement,
                index % +GRID_SIZE,
                Math.floor(index / +GRID_SIZE)
            )
        });
    }

    get cellsByColumn() {
        return this._cells.reduce((cellGrid: Cell[][], cell: Cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }

    get cellsByRow() {
        return this._cells.reduce((cellGrid: Cell[][], cell: Cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, []);
    }

    get emptyCells() {
        return this._cells.filter((cell) => cell.tile == null);
    }
    

    randomEmptyCell = () => {
        const randomIndex = Math.floor(Math.random() * this.emptyCells.length);
        return this.emptyCells[randomIndex];
    }
}

export class Cell {
    private _element : HTMLDivElement;
    private _x : number;
    private _y : number;
    private _tile : Tile | null;
    private _mergeTile : Tile | null;

    constructor(element: HTMLDivElement, x: number, y: number) {
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

    get tile() : Tile | null{
        return this._tile;
    }

    set tile(value : Tile | null) {
        this._tile = value;
        
        if(value === null) { return; }
        if(this._tile) {
            this._tile.x = this._x;
            this._tile.y = this._y;
        }
    }

    get mergeTile() : Tile | null{
        return this._mergeTile;
    }

    set mergeTile(value : Tile | null) {
        this._mergeTile = value;
        if(value == null) return;
        if(this._mergeTile) {
            this._mergeTile.x = this._x;
            this._mergeTile.y = this._y;
        }
    }

    canAccept(tile: Tile | null) {
        return (this.tile == null ||
             (this.mergeTile == null && this.tile.value === tile?.value)
        )
    }
}


const createCellElements = (containerElement: HTMLDivElement) : HTMLDivElement[] => {
    const cellArray = [];

    for(let i = 0; i < +GRID_SIZE * +GRID_SIZE; i++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        // cellElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        // cellElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        containerElement.appendChild(cellElement);
        cellArray.push(cellElement);
    }

    return cellArray;
};