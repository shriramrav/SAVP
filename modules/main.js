import  Grid  from './components/grid.js';
import BFS from './algorithms/BFS.js';
import A_Star from './algorithms/a-star.js';


let grid = new Grid({ X: 64, Y: 33 }, document.getElementById('Canvas'));

function init() {
    const nodeSize = 30;
    grid.draw(nodeSize);
}

function run() {
    // BFS.search(grid);
    
    A_Star.search(grid);
}

window.init = init;
window.run = run;

function mousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return { X: x, Y: y };
}

function getNode(Point) {
    return { X: Math.floor(Point.X / grid.nodeSize), Y: Math.floor(Point.Y / grid.nodeSize) };
}

let mouseHold = false; let mouseCtr = 0;

document.querySelector("canvas").addEventListener("mousedown", function (e) {
    let nodeLoc = getNode(mousePos(document.querySelector("canvas"), e));

    if (grid.getNode(nodeLoc).isEnabled()) {
        if (mouseCtr == 0) {
            grid.setStart(nodeLoc);
            grid.drawNode(nodeLoc, 'black');
            grid.write("S", 'white', nodeLoc);

        } else if (mouseCtr == 1) {
            grid.setEnd(nodeLoc);
            grid.drawNode(nodeLoc, 'black');
            grid.write("E", 'white', nodeLoc);
        } else {
            grid.getNode(nodeLoc).setEnabled(false);
            grid.drawNode(nodeLoc, 'red');
        }
    }
    mouseCtr++;
    mouseHold = true;
});

document.querySelector("canvas").addEventListener("mouseup", function (e) {
    mouseHold = false;
});

document.querySelector("canvas").addEventListener("mousemove", function (e) {
    if (mouseHold) {
        let nodeLoc = getNode(mousePos(document.querySelector("canvas"), e));
        if (grid.getNode(nodeLoc).isEnabled()) {
            grid.getNode(nodeLoc).setEnabled(false);
            grid.drawNode(nodeLoc, 'red');
        }
    }
});
