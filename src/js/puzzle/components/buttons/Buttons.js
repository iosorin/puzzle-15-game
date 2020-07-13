import { $ } from '@puzzle/core/dom';
import { create } from './buttons.temlate';
import { BaseComponent } from "@puzzle/core/BaseComponent";

class PuzzleButtons extends BaseComponent {
    static className = 'puzzle-game__buttons';

    constructor($root, emitter, options) {
        const listeners = ['click'];

        super($root, {
            name,
            listeners,
            emitter
        });

        this.buttons = options.buttons;
    }

    onClick(e) {
        const $target = $(e.target);

        if ($target.data.action) {
            this.$emit(`buttons:${$target.data.action}`);
        }
    }

    toHTML() {
        if (!this.buttons) return '';

        return create(this.buttons);
    }
}

export default PuzzleButtons;
