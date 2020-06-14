export default class Animation {

    static anim = (grid, nodes) => {

        const grad_speed = 1;
        const node_speed = 1;
        const path_speed = 50;
        const delay = grad_speed * 12;


        const visited_colors = [
            "#004DF5",
            "#005DDF",
            "#006DC9",
            "#007DB3",
            "#008E9D",
            "#009E87",
            "#00AE71",
            "#00BF5B",
            "#00CF45",
            "#00DF2F",
            "#00F01A"
        ];

        function draw(pos) {
            (function loop(color_ctr) {
                setTimeout(function () {
                    grid.drawNode(pos, visited_colors[color_ctr]);
                    if (color_ctr < visited_colors.length) {
                        loop(++color_ctr);
                    }
                }, grad_speed);
            })(0);
        }

        (function loop(i) {
            setTimeout(function () {
                if (!grid.nodes[nodes[i].X][nodes[i].Y].isEnd()) {
                    draw(nodes[i]);
                }
                if (i < nodes.length - 1) {
                    loop(++i);
                } else {
                    setTimeout(function () {
                        drawPath(grid);
                    }, delay);
                }
            }, node_speed);
        })(0);

        function drawPath(grid) {
            (function path(pos) {
                setTimeout(function () {
                    grid.drawNode(pos, 'black');
                    let temp = grid.getNode(pos).prev();
                    if (!grid.getNode(temp).isStart()) {
                        path(temp);
                    }
                }, path_speed);
            })(grid.getEndNode().prev());
        }
    }
}

