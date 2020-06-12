import Queue from '../datastructures/queue.js';

export default class BFS {

    static search(grid) {

        let queue = new Queue();
        let searched = [];
        let checkEnd = false;
        let adjX = [-1, 1, 0, 0];
        let adjY = [0, 0, 1, -1];

        queue.add(grid.getStartPos());

        while ((!queue.isEmpty()) && (!checkEnd)) {
        
            let temp = queue.poll();
            let visited = [];
        
            for (let i = 0; i < adjX.length; i++) {
        
                let x = temp.X + adjX[i];
                let y = temp.Y + adjY[i];
        
                if (!this.isValid(grid.nodes.length, grid.nodes[0].length, x, y)) {
                    if ((grid.nodes[x][y].isEnabled()) ||  (grid.nodes[x][y].isEnd())){
                        if (!grid.nodes[x][y].isVisited()) {
                            visited.push({ X: x, Y: y });
                            grid.nodes[x][y].setVisited(true, temp);
                            if (grid.nodes[x][y].isEnd()) {
                                checkEnd = true;
                                break;
                            }
                            queue.add({ X: x, Y: y });
                        }
                    }
                }
            }
            if (visited.length != 0) {
                searched.push(visited);
            }
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

    static isValid(X_max, Y_max, x, y) {
        if ((x >= 0) && (x < X_max)) {
            if ((y >= 0) && (y < Y_max)) {
                return false;
            }
        }
        return true;
    }
}
