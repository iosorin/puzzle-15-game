import { $ } from '@core/dom';
import { create } from './buttons.temlate';
import { BaseStateComponent } from '@puzzle/core/BaseStateComponent';

const EMIT_MAP = {
    shuffle: 'puzzle:shuffle',
    resolve: 'puzzle:resolve',
    undo: 'history:undo',
    redo: 'history:redo'
};

class PuzzleButtons extends BaseStateComponent {
    static className = 'puzzle-game__buttons';

    constructor($root, emitter, options) {
        const listeners = ['click'];

        super($root, {
            listeners,
            emitter
        });

        this.buttons = options.buttons;
    }

    get template() {
        return create(this.state);
    }


    init() {
        super.init();

        if (this.buttons) {
            this.setState({
                buttons: this.buttons,
                canUndo: true,
                canRedo: true
            });

            // this.$on('history:changed', ({ canUndo, canRedo } = {}) => {
            //     this.setState({ canUndo, canRedo });
            // });
        }
    }

    onClick(e) {
        const $target = $(e.target);
        const { action } = $target.data;

        if (action) {
            if (EMIT_MAP[action] === EMIT_MAP.shuffle) {
                this.$emit(EMIT_MAP[action], 0); // delay
            }
            else {
                this.$emit(EMIT_MAP[action]);
            }
        }
    }

    toHTML() {
        return this.template;
    }
}

export default PuzzleButtons;
