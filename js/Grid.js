import { Cell } from "./Cell.js";

export class Grid {
    constructor(width, height, cellWidth = 10) {
        this.width = width;
        this.height = height;
        this.cells = [];
        this.cellWidth = cellWidth;
    }

    initialize() {
        this.cells = [];
        this.path = null;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let type = 'air';

                if (x == 0 || x == this.width - 1 || y == 0 || y == this.height - 1) {
                    type = 'wall';
                }

                // if (Math.random() < 0.1) {
                //     type = 'wall';
                // }

                this.addCell(new Cell(x, y, type));
            }
        }

        for (let x = 7; x < 20; x++) {
            for (let y = 10; y < 20; y++) {
                this.getCell(x, y).type = 'wall';
            }
        }

        for (let x = 13; x <= 20; x++) {
            this.getCell(x, 30).type = 'wall';
        }
        for (let y = 22; y < 40; y++) {
            this.getCell(20, y).type = 'wall';
        }

        for (let x = 30; x < 50; x++) {
            for (let y = 10; y < 20; y++) {
                this.getCell(x, y).type = 'wall';
            }
        }

        for (let x = 30; x < 60; x++) {
            for (let y = 30; y < 40; y++) {
                this.getCell(x, y).type = 'wall';
            }
        }
    }

    addCell(cell) {
        this.cells.push(cell);
    }

    getCell(x, y) {
        // find cell
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }

        return this.cells[y + x * this.width];
    }

    draw(path) {
        this.path = this.path || path;

        if (!this.app || !this.graphics) {
            this.initializeDraw();
        }

        this.graphics.clear();

        for (let cell of this.cells) {
            let color = 0x000000;

            switch (cell.type) {
                case 'start':
                    color = 0x00ff00;
                    break;
                case 'end':
                    color = 0xff0000;
                    break;
                case 'wall':
                    color = 0xaaaaaa;
                    break;
                case 'visited':
                    color = 0x0000ff;
                    break;
                case 'visiting':
                    color = 0x00ffff;
                    break;
                case 'air':
                default:
                    color = 0x111111;
                    break;
            }

            this.graphics.lineStyle(1, 0x000000, 1);
            this.graphics.beginFill(color);
            this.graphics.drawRect(cell.x * this.cellWidth, cell.y * this.cellWidth, this.cellWidth, this.cellWidth);
            this.graphics.endFill();

            // if (this.path) {
            //     this.graphics.lineStyle(1, 0x00ff00, 1);

            //     for (const cell of this.path) {
            //         const previous = cell.previous;
            //         if (previous) {
            //             this.graphics.moveTo(cell.x * this.cellWidth + this.cellWidth / 2, cell.y * this.cellWidth + this.cellWidth / 2);
            //             this.graphics.lineTo(previous.x * this.cellWidth + this.cellWidth / 2, previous.y * this.cellWidth + this.cellWidth / 2);
            //         }
            //     }
            // }
        }
    }

    initializeDraw() {
        if (!this.app) {
            this.app = new PIXI.Application({
                width: this.width * this.cellWidth,
                height: this.height * this.cellWidth,
                antialias: false,
                transparent: false,
                resolution: 1
            });

            document.getElementById('container').appendChild(this.app.view);
        }

        if (!this.graphics) {
            this.graphics = new PIXI.Graphics();
            this.app.stage.addChild(this.graphics);
        }
    }
}
