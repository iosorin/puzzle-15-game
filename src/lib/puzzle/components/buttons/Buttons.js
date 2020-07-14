/* eslint-disable no-case-declarations */
import { $ } from '@core/dom';
import { config } from '@puzzle/constants';
import { BaseStateComponent } from '@puzzle/core/BaseStateComponent';
import { create } from './buttons.temlate';

class PuzzleButtons extends BaseStateComponent {
    static className = 'puzzle-game__buttons';

    constructor($root, options) {
        const listeners = ['click'];

        super($root, {
            listeners,
            ...options
        });

        this.config = options.config;

        this.buttons = this.config.buttons;
    }

    get template() {
        return create(this.state);
    }

    init() {
        super.init();

        if (this.buttons) {
            if (!Array.isArray(this.buttons)) {
                this.buttons = config.buttons;
            }

            this.setInitialState();

        }

        this.$on('history:reset',() => this.setInitialState());
    }

    setInitialState() {
        const { buttons } = this;

        this.setState({
            buttons,
            undo: this.store.get()?.history?.executed.length,
            redo: this.store.get()?.history?.unexecuted.length
        });

        this.$on('history:changed', (changes = {}) => {
            if ('undo' in changes) {
                this.setState({ undo: changes.undo });
            }

            if ('redo' in changes) {
                this.setState({ redo: changes.redo });
            }
        });
    }

    onClick(e) {
        const $target = $(e.target);

        switch ($target.data.action) {
            case 'undo':
                this.$emit('history:undo');
                break;
            case 'redo':
                this.$emit('history:redo');
                break;
            case 'shuffle':
                this.$emit('puzzle:shuffle', 0);
                break;
            case 'resolve':
                this.$emit('puzzle:resolve');
                break;
            case 'changeImage':
                this.$emit('image:change');
                break;
            default:
                break;
        }
    }

    toHTML() {
        if (!this.buttons) return '';

        return this.template;
    }
}

export default PuzzleButtons;
