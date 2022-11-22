export class Cell {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.h = Infinity;
        this.g = Infinity;
        this.f = Infinity;
        this.type = type;
    }
}
