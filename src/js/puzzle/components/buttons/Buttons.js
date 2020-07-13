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
        const { action } = $target.data;

        this.$emit(`puzzle:${action}`);
    }

    toHTML() {
        if (!this.buttons) return '';

        return create(this.buttons);
    }
}

export default PuzzleButtons;
