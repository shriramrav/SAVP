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
                    let pos = { X: x, Y: y };
                    if ((grid.getNode(pos).isEnabled()) ||  (grid.getNode(pos).isEnd())){
                        if (!grid.getNode(pos).isVisited()) {
                            visited.push(pos);
                            grid.getNode(pos).setVisited(true, temp);
                            if (grid.getNode(pos).isEnd()) {
                                checkEnd = true;
                                break;
                            }
                            queue.add(pos);
                        }
                    }
                }
            }
            if (visited.length != 0) {
                searched.push(visited);
            }
        }
        grid.animate(searched.flat());
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
