"use strict";
const createGrid = (size) => {
    const container = document.querySelector(".game-container");
    for (let i = 0; i < size.rows; i++) {
        for (let j = 0; j < size.cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            container === null || container === void 0 ? void 0 : container.appendChild(cell);
        }
    }
    if (container) {
        container.style.display = "grid";
        container.style.gridTemplateRows = `repeat(${size.rows}, 1fr)`;
        container.style.gridTemplateColumns = `repeat(${size.cols}, 1fr)`;
    }
};
const createTile = () => {
    const container = document.querySelector(".game-container");
};
createGrid({ rows: 4, cols: 4 });
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            console.log(event.key);
            break;
        case "ArrowDown":
            console.log(event.key);
            break;
        case "ArrowLeft":
            console.log(event.key);
            break;
        case "ArrowRight":
            console.log(event.key);
            break;
        default:
            break;
    }
});
