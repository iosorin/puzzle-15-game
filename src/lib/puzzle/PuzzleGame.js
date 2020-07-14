import { $ } from '@core/dom';
import { History } from '@core/History';
import { Emitter } from '@core/Emitter';
import { BaseComponent } from '@core/BaseComponent';
import { components } from './components';
import { keymapEvent } from '@core/utils';
import * as constants from '@core/constants';

export class PuzzleGame extends BaseComponent {
    constructor(selector, config) {
        const $document = $(document);
        const emitter = new Emitter();
        const listeners = ['keydown'];

        super($document, {
            emitter,
            listeners
        });

        this.emitter = emitter;
        this.components = components || [];

        this.$container = $(selector);
        this.config = { ...constants.config, ...config };
    }

    gameRoot() {
        const $gameRoot = $.create('div', 'puzzle-game');

        this.components = this.components.map((Component) => {
            const $componentRoot = $.create('div', Component.className);
            const component = new Component($componentRoot, this.emitter, this.config);

            if (component.toHTML().length) {
                $componentRoot.html(component.toHTML());
                $gameRoot.append($componentRoot);
            }

            return component;
        });

        return $gameRoot;
    }

    init() {
        super.init();

        this.$container.append(this.gameRoot());

        this.components.forEach(component => component.init());

        this.listen();
    }

    listen() {
        this.onResolve = this.onResolve.bind(this);
        this.$on('board:resolved', this.onResolve);
    }

    onResolve() {
        const startNewGame = confirm(constants.confirmMessage);

        if (startNewGame) {
            this.$emit('puzzle:shuffle');
        }
    }

    onKeydown(e) {
        const event = keymapEvent(constants.keymap, e);

        if (event) {
            this.$emit('puzzle:keydown', event);
        }
    }

    destroy() {
        this.components.forEach(component => component.destroy());
    }
}
