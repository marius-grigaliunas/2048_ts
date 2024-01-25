export default class Tile {
    private _tileElement : HTMLDivElement;
    private _value : number | null;
    private _x : number | null;
    private _y : number | null;

    constructor(tileContainer : HTMLDivElement, value = Math.random() > .5 ? 2 : 4) {
        this._tileElement = document.createElement('div');
        this._tileElement.classList.add("tile");
        tileContainer.append(this._tileElement);
        this._value = value;
        this.value = value;
        this._x = null;
        this._y = null;
    }

    get value () : number {
        return this._value ? this._value : 0;
    }

    set value(value : number) {
        this._tileElement.textContent = value.toString();
        this._value = value;
        const power = Math.log2(value);
        const backgroundLightness = 100 - (power * 15);
        this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
    }

    set x(value : number) {
        this._x = value;
        this._tileElement.style.setProperty("--x", value.toString());
    }

    set y(value : number) {
        this._y = value;
        this._tileElement.style.setProperty("--y", value.toString());
    }

    remove() {
        this._tileElement.remove();
    }

    waitForTransition(animation = false) {
        return new Promise((resolve) => {
            this._tileElement.addEventListener( animation ? "animationend" : 'transitionend',
             resolve, {once: true});
        });
    }
}