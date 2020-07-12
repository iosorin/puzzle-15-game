import { $ } from './core/dom';
import { components } from './components';
import { merge, keymapEvent } from './core/utils';
import { options as initialOptions, keymap } from './core/defaults';
import { Emitter } from './core/Emitter';
import { BaseComponent } from './core/BaseComponent';


export class PuzzleGame extends BaseComponent {
    constructor(selector, options) {
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
        this.options = { ...initialOptions, ...options };
    }

    gameRoot() {
        const $gameRoot = $.create('div', 'puzzle-game');

        this.components = this.components.map((Component) => {
            const $componentRoot = $.create('div', Component.className);
            const component = new Component($componentRoot, this.emitter, this.options);

            if (component.toHTML().length) {
                $componentRoot.html(component.toHTML());
                $gameRoot.append($componentRoot);
            }

            return component;
        });

        return $gameRoot;
    }

    onKeydown(e) {
        const event = keymapEvent(keymap, e);

        if (event) {
            this.$emit('puzzle:keydown', event);
        }
    }

    init() {
        super.init();

        this.$container.append(this.gameRoot());

        this.components.forEach(component => component.init());
    }

    destroy() {
        this.components.forEach(component => component.destroy());
    }
}
