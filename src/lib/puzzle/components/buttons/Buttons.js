import { $ } from '@core/dom';
import { create } from './buttons.temlate';
import { BaseStateComponent } from '@puzzle/core/BaseStateComponent';

const emitMap = {
    undo: 'history:undo',
    redo: 'history:redo',
    shuffle: 'puzzle:shuffle',
    resolve: 'puzzle:resolve'
};

class PuzzleButtons extends BaseStateComponent {
    static className = 'puzzle-game__buttons';

    constructor($root, emitter, config) {
        const listeners = ['click'];

        super($root, {
            listeners,
            emitter
        });

        this.buttons = config.buttons;
    }

    get template() {
        return create(this.state);
    }

    init() {
        super.init();

        const { buttons } = this;

        this.setState({
            buttons,
            undo: true,
            redo: true
        });

        this.$on('history:changed', (changed = {}) => {
            if ('undo' in changed) {
                this.setState({ undo: changed.undo });
            }

            if ('redo' in changed) {
                this.setState({ redo: changed.undo });
            }
        });
    }

    onClick(e) {
        const $target = $(e.target);
        const { action } = $target.data;

        if (action) {
            if (emitMap[action] === emitMap.shuffle) {
                this.$emit(emitMap[action], 0); // delay
            }
            else {
                this.$emit(emitMap[action]);
            }
        }
    }

    toHTML() {
        return this.template;
    }
}

export default PuzzleButtons;
