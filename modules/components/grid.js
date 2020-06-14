import Node from './node.js';
import Animation from './animate.js';


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
        this.setFont("30px Arial");
    }

    draw(nodeSize) {
        this.nodeSize = nodeSize;
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 2;
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[0].length; j++) {
                this.drawNode({ X: i, Y: j }, 'white');
            }
        }
        this.ctx.shadowBlur = 0;
    }

    drawNode = (pos, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            pos.X * this.nodeSize,
            pos.Y * this.nodeSize,
            this.nodeSize - 1,
            this.nodeSize - 1
        );
    }

    write(str, color, nodeLoc) {
        this.ctx.fillStyle = color;
        this.ctx.fillText(str, (nodeLoc.X * this.nodeSize) + 5, (nodeLoc.Y * this.nodeSize) + 25);
    }

    setFont(str) {
        this.ctx.font = str;
    }

    setStart(pos) {
        this.getNode(pos).setStart(true);
        this.startPos = pos;
    }

    setEnd(pos) {
        this.getNode(pos).setEnd(true);
        this.endPos = pos;
    }

    getStartNode() {
        return this.getNode(this.getStartPos());
    }

    getNode(pos) {
        return this.nodes[pos.X][pos.Y];
    }
    
    getEndNode = () => {
        return this.getNode(this.getEndPos());
    }

    getStartPos() {
        return this.startPos;
    }

    getEndPos() {
        return this.endPos;
    }

    animate(visited) {
        Animation.anim(this, visited);
    } 

    getDims() {
        return { X: this.nodes.length, Y: this.nodes[0].length };
    }
}


