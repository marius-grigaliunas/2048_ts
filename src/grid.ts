import Tile from "./tile.js";

const GRID_SIZE = "4";
const CELL_SIZE = "20";
const CELL_GAP = "2";

export default class Grid {
    private cells : Cell[];

    constructor(containerElement: HTMLDivElement) {
        containerElement.style.setProperty("--grid-size", GRID_SIZE);
        containerElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        containerElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

        this.cells = createCellElements(containerElement).map((cellElement : HTMLDivElement, index: number) => {
            return new Cell(
                cellElement,
                index % +GRID_SIZE,
                Math.floor(index / +GRID_SIZE)
            )
        });

        console.log(this.cells);
    }

    get emptyCells() {
        return this.cells.filter((cell) => cell.tile == null);
    }
    

    randomEmptyCell = () => {
        const randomIndex = Math.floor(Math.random() * this.emptyCells.length);
        return this.emptyCells[randomIndex];
    }
}

class Cell {
    private element : HTMLDivElement;
    private x : number;
    private y : number;
    tile: Tile | undefined;

    constructor(element: HTMLDivElement, x: number, y: number) {
        this.element = element;
        this.x = x;
        this.y = y;
    }

    
    getTile() : Tile | undefined{
        return this.tile;
    }

    setTile(value : Tile | undefined) {
        this.tile = value;
        
        if(value === undefined) { return; }
        if(this.tile) {
            this.tile.x = this.x;
            this.tile.y = this.y;
        }
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