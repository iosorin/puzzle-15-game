import { DomListener } from './DomListener';

export class BaseComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);

        this.router = options.router;
        this.emitter = options.emitter;
        this.store = options.store;

        this.unsubscribers = [];
    }

    // EMITTER ========================================
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, callback) {
        const unsubscribe = this.emitter.listen(event, callback);

        this.unsubscribers.push(unsubscribe);
    }

    // LIFECYCLES ========================================
    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();

        this.unsubscribers.forEach(unsub => unsub());
    }

    // TEMPLATE ========================================
    toHTML() {
        return '';
    }
}
