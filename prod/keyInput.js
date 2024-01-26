var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { move } from './input.js';
let grid;
let gameContainer;
let score;
export const setupKeyInput = (gridImported, gameContainerImported, scoreImported) => {
    grid = gridImported;
    gameContainer = gameContainerImported;
    score = scoreImported;
    window.addEventListener('keydown', handleInput, { once: true });
};
const handleInput = (event) => __awaiter(void 0, void 0, void 0, function* () {
    switch (true) {
        case (event.key === 'ArrowUp'):
            move(grid, "up", gameContainer, score);
            break;
        case (event.key === 'ArrowDown'):
            move(grid, "down", gameContainer, score);
            break;
        case (event.key === 'ArrowLeft'):
            move(grid, "left", gameContainer, score);
            break;
        case (event.key === 'ArrowRight'):
            move(grid, "right", gameContainer, score);
            break;
        default:
            setupKeyInput(grid, gameContainer, score);
            break;
    }
    setupKeyInput(grid, gameContainer, score);
});
