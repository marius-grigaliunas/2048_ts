const container = document.querySelector(".game-container");

let gridSize = { rows: 4, cols: 4 };








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

})