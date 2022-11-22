import { Astar } from "./js/Astar.js";
import { Grid } from "./js/Grid.js";

document.addEventListener('contextmenu', event => event.preventDefault());

let grid = new Grid(64, 64);
grid.initialize();
grid.draw();
setInterval(() => grid.draw(), 1000 / 20);

let startPos = { x: 1, y: 1 };
let endPos = { x: 62, y: 62 };

window.addEventListener('click', async (e) => {
    console.log(e);

    const canvas = document.querySelector('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellX = Math.floor(x / grid.cellWidth);
    const cellY = Math.floor(y / grid.cellWidth);

    console.log(x, y);
    console.log(cellX, cellY);

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

    grid.initialize();

    let aStar = new Astar(grid, grid.getCell(startPos.x, startPos.y), grid.getCell(endPos.x, endPos.y));
    const path = await aStar.A_Star();

    for (let cell of path) {
        cell.type = 'visited';
    }

    grid.draw(path);

    // reset start and end since they get overwritten by the path
    grid.getCell(startPos.x, startPos.y).type = 'start';
    grid.getCell(endPos.x, endPos.y).type = 'end';

    await aStar.sleep(2000);
});

grid.initialize();

let aStar = new Astar(grid, grid.getCell(startPos.x, startPos.y), grid.getCell(endPos.x, endPos.y));
const path = await aStar.A_Star();

for (let cell of path) {
    cell.type = 'visited';
}

grid.draw(path);

// reset start and end since they get overwritten by the path
grid.getCell(startPos.x, startPos.y).type = 'start';
grid.getCell(endPos.x, endPos.y).type = 'end';


