import Node from './node.js';

export default class Grid {
    ctx;
    nodes;
    nodeSize;
    startPos;
    endPos;

    constructor(size, canvas) {
        this.ctx = canvas.getContext('2d');
        this.nodes = new Array(size.X);
        for (let i = 0; i < size.X; i++) {
            this.nodes[i] = new Array(size.Y);
            for (let j = 0; j < size.Y; j++) {
                this.nodes[i][j] = new Node();
            }
        }
    }

    draw(nodeSize) {
        this.nodeSize = nodeSize;
        console.log(nodeSize);
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 2;
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[0].length; j++) {
                this.drawNode(i * nodeSize, j * nodeSize, 'white');
            }
        }
        this.ctx.shadowBlur = 0;
    }

    drawNode(X, Y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            X,
            Y,
            this.nodeSize - 1,
            this.nodeSize - 1
        );
    }

    setStart(x, y) {
        this.nodes[x][y].setStart(true);
        this.startPos = { X: x, Y: y };
    }

    setEnd(x, y) {
        this.nodes[x][y].setEnd(true);
        this.endPos = { X: x, Y: y };
    }

    getStartPos() {
        return this.startPos;
    }

    getEndPos() {
        return this.endPos;
    }

}


