import PriorityQueue from '../datastructures/priorityqueue.js';

export default class A_Star {
    static search(grid) {

        let queue = new PriorityQueue();
        let searched = [];
        let checkEnd = false;

        let adjX = [-1, 1, 0, 0];
        let adjY = [0, 0, 1, -1];

        queue.add(grid.getStartPos(), 0);

        let ctr = 0;

        while ((!queue.isEmpty()) && (!checkEnd)) {
        
            let temp = queue.poll();
            let visited = [];
        
            for (let i = 0; i < adjX.length; i++) {
        
                let x = temp.X + adjX[i];
                let y = temp.Y + adjY[i];
        
                if (this.isValid(grid.nodes.length, grid.nodes[0].length, x, y)) {
                    if ((grid.nodes[x][y].isEnabled()) ||  (grid.nodes[x][y].isEnd())){
                        if (!grid.nodes[x][y].isVisited()) {
                            visited.push({ X: x, Y: y });
                            grid.nodes[x][y].setVisited(true, temp);
                            if (grid.nodes[x][y].isEnd()) {
                                checkEnd = true;
                                break;
                            }
                            let pos = { X: x, Y: y };
                            console.log(this.cost(grid.getStartPos(), grid.getEndPos(), pos));
                            queue.add(pos, this.cost(grid.getStartPos(), grid.getEndPos(), pos));
                        }
                    }
                }
            }
            console.log("visted length " + visited.length);
            if (visited.length != 0) {
                searched.push(visited);
            }
            console.log("ctr:" + ctr);
            ctr++;

        }

        let end = grid.getEndPos();

        (function drawVisited(i) {
            setTimeout(function () {
                let loop = (i, color) => {
                    for (let j = 0; j < searched[i].length; j++) {
                        if (grid.nodes[searched[i][j].X][searched[i][j].Y].isEnabled()) {
                            console.log(searched[i].length);
                            grid.drawNode(searched[i][j].X * grid.nodeSize, searched[i][j].Y * grid.nodeSize, color);
                        }
                    }
                };
                if (i > 0) {
                    loop(i - 1, 'purple');
                }
                loop(i, 'rgb(0, 181, 132)');
                if (i != searched.length - 1) {
                    drawVisited(++i);
                } else {
                    drawPath(grid.nodes[end.X][end.Y].prev());
                }
            }, 10);
        })(0);

        function drawPath(node) {
            setTimeout(function () {
                grid.drawNode(node.X * grid.nodeSize, node.Y * grid.nodeSize, 'rgb(230,230,250)');
                let temp = grid.nodes[node.X][node.Y].prev();
                if (!grid.nodes[temp.X][temp.Y].isStart()) {
                    drawPath(temp);
                }
            }, 50);
        }
    }

    static cost(startPos, endPos, pos) {
        return this.dist(startPos, pos) + this.dist(endPos, pos);
    }

    static dist(p1, p2) {
        return (Math.pow((Math.pow((p2.X - p1.X), 2) + Math.pow((p2.Y - p1.Y), 2)), 0.5));
    }

    static isValid(X_max, Y_max, x, y) {
        if ((x >= 0) && (x < X_max)) {
            if ((y >= 0) && (y < Y_max)) {
                return true;
            }
        }
        return false;
    }
}