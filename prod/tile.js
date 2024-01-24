export default class Tile {
    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
        this._tileElement = document.createElement('div');
        this._tileElement.classList.add("tile");
        tileContainer.append(this._tileElement);
        this._value = value;
        this.value = value;
        this._x = null;
        this._y = null;
    }
    set value(value) {
        this._tileElement.textContent = value.toString();
        this._value = value;
        const power = Math.log2(value);
        const backgroundLightness = 100 - (power * 15);
        this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
    }
    set x(value) {
        this._x = value;
        this._tileElement.style.setProperty("--x", value.toString());
    }
    set y(value) {
        this._y = value;
        this._tileElement.style.setProperty("--y", value.toString());
    }
}
