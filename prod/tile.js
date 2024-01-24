export default class Tile {
    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
        this.tileElement = document.createElement('div');
        this.tileElement.classList.add("tile");
        tileContainer.append(this.tileElement);
        this.value = value;
    }
    set x(value) {
        this.x = value;
        this.tileElement.style.setProperty("--x", value.toString());
    }
    set y(value) {
        this.y = value;
        this.tileElement.style.setProperty("--y", value.toString());
    }
}
