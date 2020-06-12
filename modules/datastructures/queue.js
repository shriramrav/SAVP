export default class Queue {
    items;
    
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }

    peek() {
        return (this.isEmpty()) ? null : this.items[0];
    }

    poll() {
        return (this.isEmpty()) ? null : this.items.shift();
    }

    isEmpty() {
        return (this.items.length == 0) ? true : false;
    }

    size() {
        return this.items.length;
    }
}