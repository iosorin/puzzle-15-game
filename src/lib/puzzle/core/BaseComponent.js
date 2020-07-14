import { DomListener } from './DomListener';

export class BaseComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);

        this.name = options.name || '';
        this.emitter = options.emitter;

        this.unsubscribers = [];

        this.onBeforeInit();
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
    onBeforeInit() {}

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();

        this.unsubscribers.forEach(unsub => unsub());
    }

    // Component Template
    toHTML() {
        return '';
    }
}