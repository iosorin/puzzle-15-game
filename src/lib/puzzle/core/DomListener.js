import { capitalize } from './utils';

const getMethodName = (eventName) => {
    return `on${ capitalize(eventName) }`;
};

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('DomListener.js: No $root provided');
        }

        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        if (!Array.isArray(this.listeners) || !this.listeners.length) {
            return;
        }

        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);

            if (!this[method]) {
                // eslint-disable-next-line no-console
                console.warn(`DomListener.js: Method ${ method } is not implemented in ${ this.name } component`);

                return;
            }

            this[method] = this[method].bind(this);

            this.$root.on(listener, this[method]);
        });
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);

            this.$root.off(listener, this[method]);
        });
    }
}
