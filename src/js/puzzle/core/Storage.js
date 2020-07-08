export class Storage {
    constructor(key = 'localstorage') {
        this.key = key;
    }

    get data() {
        return JSON.parse(localStorage.getItem(this.key)) || {};
    }

    set data(payload) {
        localStorage.setItem(this.key, JSON.stringify(payload));
    }

    update(payload) {
        this.data = Object.assign(this.data, payload);
    }
}
