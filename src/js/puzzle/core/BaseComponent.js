import { DomListener } from './DomListener';

export class BaseComponent extends DomListener {
    constructor($root, componentOptions = {}) {
        super($root, componentOptions.listeners);

        this.name = componentOptions.name || '';
        this.emitter = componentOptions.emitter;

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
