export class Emitter {
    constructor() {
        this.emitted = {};
    }

    emit(event, ...args) {
        if (Array.isArray(this.emitted[event])) {
            this.emitted[event].forEach((callback) => {
                callback(...args);
            });

            return true;
        }

        return false;
    }

    listen(event, callback) {
        this.emitted[event] = this.emitted[event] || [];
        this.emitted[event].push(callback);

        return () => {
            this.emitted[event] = this.emitted[event]
                .filter(callback => callback !== callback);
        };
    }
}
