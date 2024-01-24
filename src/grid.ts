const GRID_SIZE = "4";
const CELL_SIZE = "20";
const CELL_GAP = "2";

export default class Grid {
    constructor(containerElement: HTMLDivElement) {
        containerElement.style.setProperty("--grid-size", GRID_SIZE);
        containerElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        containerElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    }
}
