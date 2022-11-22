export class Astar {
    constructor(grid, start, end) {
        this.grid = grid;
        this.start = start;
        this.end = end;
        this.openList = [];
        this.closedList = [];
        this.path = [];
        this.current = null;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    backtrack(current) {
        const tempPath = [];

        tempPath.push(current);

        while (current.previous) {
            tempPath.push(current.previous);
            current = current.previous;
        }

        return tempPath.reverse();
    }

    async A_Star() {
        this.start.f = this.heuristic(this.start, this.end);
        this.start.g = 0;
        this.start.f = this.start.g + this.start.h;
        this.openList.push(this.start);

        while (this.openList.length > 0) {
            // for (let cell of this.path) {
            //     cell.type = 'air';
            // }

            this.openList.sort((a, b) => a.f - b.f); // First node in the list is the one with the lowest f value
            const current = this.openList.shift(); // Remove lowest f value from openList
            this.closedList.push(current); // Add current to closedList

            if (current === this.end) {
                console.log('Found the end!');
                this.path = this.backtrack(current);
                return this.path;
            }

            for (const neighbor of this.getNeighbors(current)) {
                let betterPath = false;

                if (this.closedList.includes(neighbor)) {
                    continue;
                }
                let tempG = current.g + this.distance(current, neighbor);
                if (this.openList.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        betterPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    this.openList.push(neighbor);
                    betterPath = true;
                }

                if (betterPath) {
                    neighbor.h = this.heuristic(neighbor, this.end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
            this.closedList.push(current);

            this.path = this.backtrack(current);
            for (let cell of this.path) {
                cell.type = 'visiting';
            }
            await this.sleep(0);
        }

        throw new Error('No path found!');
    }

    distance(a, b) {
        let dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        return dist;
    }

    heuristic(a, b) {
        let dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        return dist;
    }

    getNeighbors(cell) {
        let neighbors = [];

        let top = this.grid.getCell(cell.x, cell.y - 1);
        let right = this.grid.getCell(cell.x + 1, cell.y);
        let bottom = this.grid.getCell(cell.x, cell.y + 1);
        let left = this.grid.getCell(cell.x - 1, cell.y);
        let topRight = this.grid.getCell(cell.x + 1, cell.y - 1);
        let bottomRight = this.grid.getCell(cell.x + 1, cell.y + 1);
        let bottomLeft = this.grid.getCell(cell.x - 1, cell.y + 1);
        let topLeft = this.grid.getCell(cell.x - 1, cell.y - 1);

        if (top && top.type !== 'wall') {
            neighbors.push(top);
        }
        if (right && right.type !== 'wall') {
            neighbors.push(right);
        }
        if (bottom && bottom.type !== 'wall') {
            neighbors.push(bottom);
        }
        if (left && left.type !== 'wall') {
            neighbors.push(left);
        }
        if (topRight && topRight.type !== 'wall') {
            neighbors.push(topRight);
        }
        if (bottomRight && bottomRight.type !== 'wall') {
            neighbors.push(bottomRight);
        }
        if (bottomLeft && bottomLeft.type !== 'wall') {
            neighbors.push(bottomLeft);
        }
        if (topLeft && topLeft.type !== 'wall') {
            neighbors.push(topLeft);
        }

        return neighbors;
    }
}