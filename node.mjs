export class Node {
    constructor() {
        this.start = false;
        this.end = false;
        this.enabled = true;
        this.path = false;
    }
    setStart(t) {
        this.start = t;
    }
    isStart() {
        return this.start;
    }
    setEnd(t) {
        this.end = t;
    }
    isEnd() {
        return this.end;
    }
    setEnabled(t) {
        this.enabled = t;
    }
    isEnabled() {
        return this.enabled;
    }
}
