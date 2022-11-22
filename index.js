import { Astar } from "./js/Astar.js";
import { Grid } from "./js/Grid.js";

let grid = new Grid(64, 64);
grid.initialize();
setInterval(() => grid.draw(), 1000 / 20);

window.addEventListener('click', (e) => {
    const canvas = document.getElementsByTagName('canvas')[0];
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellX = Math.floor(x / grid.cellWidth);
    const cellY = Math.floor(y / grid.cellWidth);

    console.log(x, y);
    console.log(cellX, cellY);

    const cell = grid.getCell(cellX, cellY);
    if (cell) {
        cell.type = 'wall';
    }
});


let aStar = new Astar(grid, grid.getCell(1, 1), grid.getCell(62, 62));
grid.getCell(1, 1).type = 'start';
grid.getCell(62, 62).type = 'end';

const path = await aStar.A_Star();

for (let cell of path) {
    cell.type = 'visited';
}

grid.draw(path);

// reset start and end since they get overwritten by the path
grid.getCell(1, 1).type = 'start';
grid.getCell(62, 62).type = 'end';


