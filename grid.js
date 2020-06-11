import { Node } from 'node.js';

class Grid {
    canvas;
    grid;
    startPos;
    endPos;

    constructor(size, canvas) {
        this.canvas = canvas;
        this.grid = new Array(size.X);
        for (let i = 0; i < size.X; i++) {
            this.grid[i] = new Array(size.Y);
            for (let j = 0; j < size.Y; j++) {
                this.grid[i][j] = new Node();
            }
        }
    }

    setStartPos(pos) {
        this.grid[pos.X][pos.Y].setStart(true);
        this.startPos = pos;
    }

    setEndPos(pos) {
        this.grid[pos.X][pos.Y].setEnd(true);
        this.endPos = pos;
    }

}