/**
 * BaseStateComponent - rerender the template according to the state changes
 */
import { BaseComponent } from './BaseComponent';

export class BaseStateComponent extends BaseComponent {
    constructor(...args) {
        super(...args);
    }

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
}
