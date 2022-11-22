import { Astar } from "./js/Astar.js";
import { Grid } from "./js/Grid.js";

document.addEventListener('contextmenu', event => event.preventDefault());

let grid = new Grid(64, 64);
setInterval(() => grid.draw(), 1000 / 20);

let startPos = { x: 1, y: 1 };
let endPos = { x: 62, y: 62 };

window.addEventListener('click', async (e) => {
    const canvas = document.querySelector('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellX = Math.floor(x / grid.cellWidth);
    const cellY = Math.floor(y / grid.cellWidth);

    const cell = grid.getCell(cellX, cellY);
    if (cell) {
        startPos = { x: cellX, y: cellY };
    }

    grid.initialize();
});

window.addEventListener('mousemove', async (e) => {
    const canvas = document.querySelector('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellX = Math.floor(x / grid.cellWidth);
    const cellY = Math.floor(y / grid.cellWidth);

    const cell = grid.getCell(cellX, cellY);
    if (cell) {
        endPos = { x: cellX, y: cellY };
    }
});

setInterval(async () => {
    grid.initialize();

    let aStar = new Astar(grid, grid.getCell(startPos.x, startPos.y), grid.getCell(endPos.x, endPos.y));
    let path = [];
    try {
        path = await aStar.A_Star();
    } catch (e) {
        console.log(e);
    }

    for (let cell of path) {
        cell.type = 'visited';
    }

    // reset start and end since they get overwritten by the path
    grid.getCell(startPos.x, startPos.y).type = 'start';
    grid.getCell(endPos.x, endPos.y).type = 'end';

    grid.draw(path);
}, 50);

