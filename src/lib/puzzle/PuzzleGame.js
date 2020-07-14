import { $ } from '@core/dom';
import { keymapEvent } from '@core/utils';
import { LocalStorageClient } from '@core/LocalStorageClient';
import { BaseComponent } from '@core/BaseComponent';
import { Emitter } from '@core/Emitter';
import { Router as router } from '@core/Router';
import { components } from '@puzzle/components';
import * as constants from '@puzzle/constants';

export class PuzzleGame extends BaseComponent {
    constructor(selector, config) {
        const $window = $(window);
        const emitter = new Emitter();
        const store = new LocalStorageClient();
        const listeners = ['keydown', 'hashchange', 'resize'];

        super($window, {
            router,
            emitter,
            store,
            listeners
        });

        this.$container = $(selector);

        this.config = { ...constants.config, ...config };
        this.components = components || [];
        this.emitter = emitter;

        this.init();
    }

    get root() {
        const $gameRoot = $.create('div', 'puzzle-game');

        const options = {
            config: this.config,
            emitter: this.emitter,
            store: this.store,
            router
        };

        this.components = this.components.map((Component) => {
            const $componentRoot = $.create('div', Component.className);
            const component = new Component($componentRoot, options);

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

        this.$container.append(this.root);

        this.components.forEach(component => component.init());

        this.listen();
    }

    listen() {
        this.onResolve = this.onResolve.bind(this);

        this.$on('board:resolved', this.onResolve);
    }

    onResolve() {
        const startNewGame = confirm(constants.locale.confirm);

        if (startNewGame) {
            this.$emit('puzzle:shuffle');
        }
    }

    onHashchange(e) {
        const forward = e.oldURL.split('#')[1] < e.newURL.split('#')[1];

        this.$emit('puzzle:hashchange', forward);
    }

    onResize(e) {
        this.$emit('puzzle:resize');
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
