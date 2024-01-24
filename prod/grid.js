const GRID_SIZE = "4";
const CELL_SIZE = "20";
const CELL_GAP = "2";
export default class Grid {
    constructor(containerElement) {
        this.randomEmptyCell = () => {
            const randomIndex = Math.floor(Math.random() * this.emptyCells.length);
            return this.emptyCells[randomIndex];
        };
        containerElement.style.setProperty("--grid-size", GRID_SIZE);
        containerElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        containerElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        this.cells = createCellElements(containerElement).map((cellElement, index) => {
            return new Cell(cellElement, index % +GRID_SIZE, Math.floor(index / +GRID_SIZE));
        });
        console.log(this.cells);
    }
    get emptyCells() {
        return this.cells.filter((cell) => cell.tile == null);
    }
}
class Cell {
    constructor(element, x, y) {
        this.element = element;
        this.x = x;
        this.y = y;
    }
    getTile() {
        return this.tile;
    }
    setTile(value) {
        this.tile = value;
        if (value === undefined) {
            return;
        }
        if (this.tile) {
            this.tile.x = this.x;
            this.tile.y = this.y;
        }
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
