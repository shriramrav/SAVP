export default class PriorityQueue {
    items;
    list;
    
    constructor() {
        this.items = [];
        this.list = [];
    }

    add(item, val) {
        let test = false;
        for (let i = 0; i < this.list.length; i++) {
            if (val < this.list[i]) {
                this.list.splice(i, 0, val);
                this.items.splice(i, 0, item);

                test = true;     
                break; 
            }        
        }
        if (!test) {
            this.list.push(val);
            this.items.push(item);
        }
    }

    peek() {
        return (this.isEmpty()) ? null : this.items[0];
    }

    poll() {
        if (this.isEmpty()) {
            return null;
        } else {
            this.list.shift();
            return this.items.shift();
        }
    }

    size() {
        return this.list.length;
    }

    isEmpty() {
        return (this.list.length == 0) ? true : false;
    }

    print() {
        console.log(this.items);
        console.log(this.list);
        console.log("finsihed");
    }

    insert(pos, list, val) {
        let temp = [];
        for (let i = 0; i < list.length; i++) {
            if (i == pos) {
                temp.push(val);
            }
            temp.push(list[i]);
        }
        return temp;
    }
}

