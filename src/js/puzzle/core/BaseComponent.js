import { DomListener } from './DomListener';

export class BaseComponent extends DomListener {
    constructor($root, componentOptions = {}) {
        super($root, componentOptions.listeners);

        this.name = componentOptions.name || '';
        this.emitter = componentOptions.emitter;

        this.state = {};
        this.unsubscribers = [];

        this.onBeforeInit();
    }

    // STATE ========================================
    get template() {
        return JSON.stringify(this.state, null, 2);
    }

    initState(initialState = {}) {
        this.state = { ...initialState };
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };

        this.$root.html(this.template);
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
