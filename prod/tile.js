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
    get value() {
        return this._value ? this._value : 0;
    }
    set value(value) {
        this._tileElement.textContent = value.toString();
        this._value = value;
        const power = Math.log2(value);
        let backgroundLightness;
        switch (true) {
            case power < 3:
                backgroundLightness = 60 - (power * 10);
                this._tileElement.style.backgroundColor = `hsl(320, 50%, var(--background-lightness))`;
                this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
                this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
                break;
            case power < 6 && power > 3:
                backgroundLightness = 60 - (power / 3 * 10);
                this._tileElement.style.backgroundColor = `hsl(330, 70%, var(--background-lightness))`;
                this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
                this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
                break;
            case power < 9 && power > 6:
                backgroundLightness = 60 - (power / 6 * 10);
                this._tileElement.style.backgroundColor = `hsl(345, 70%, var(--background-lightness))`;
                this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
                this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
                break;
            case power < 12 && power > 9:
                backgroundLightness = 60 - (power / 9 * 10);
                this._tileElement.style.backgroundColor = `hsl(350, 50%, var(--background-lightness))`;
                this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
                this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
                break;
            default:
                backgroundLightness = 60 - (power / 12 * 10);
                this._tileElement.style.backgroundColor = `hsl(355, 50%, var(--background-lightness))`;
                this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
                this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
                break;
        }
        // if(power > 4) {
        //     backgroundLightness = 100 - ((power / 4) * 10);
        //     this._tileElement.style.backgroundColor = `hsl(347, 100%, var(--background-lightness))`;
        //     this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        //     this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
        // }
        // else {
        //     this._tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        //     this._tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
        // }
    }
    set x(value) {
        this._x = value;
        this._tileElement.style.setProperty("--x", value.toString());
    }
    set y(value) {
        this._y = value;
        this._tileElement.style.setProperty("--y", value.toString());
    }
    remove() {
        this._tileElement.remove();
    }
    waitForTransition(animation = false) {
        return new Promise((resolve) => {
            this._tileElement.addEventListener(animation ? "animationend" : 'transitionend', resolve, { once: true });
        });
    }
}
