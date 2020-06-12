export default class Stack {
    items;
    
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }

    peek() {
        return (this.isEmpty()) ? null : this.items[this.items.length - 1];
    }

    pop() {
        return (this.isEmpty()) ? null : this.items.pop();
    }

    isEmpty() {
        return (this.items.length == 0) ? true : false;
    }

    size() {
        return this.items.length;
    }
}