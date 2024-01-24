export default class Tile {
    private tileElement : HTMLDivElement;
    value : number;

    constructor(tileContainer : HTMLDivElement, value = Math.random() > .5 ? 2 : 4) {
        this.tileElement = document.createElement('div');
        this.tileElement.classList.add("tile");
        tileContainer.append(this.tileElement);
        this.value = value;
    }

    set x(value : number) {
        this.x = value;
        this.tileElement.style.setProperty("--x", value.toString());
    }

    set y(value : number) {
        this.y = value;
        this.tileElement.style.setProperty("--y", value.toString());
    }
}