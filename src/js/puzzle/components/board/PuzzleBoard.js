import { create } from './board.template';
import { BaseComponent } from '@puzzle/core/BaseComponent';

class PuzzleBoard extends BaseComponent {
    static className = 'puzzle-game__board';

    constructor($root, emitter) {
        super($root, {
            name,
            emitter
        });

        this.width = 0;
        this.height = 0;
    }

    init() {
        super.init();

        this.$on('image:loaded', (imageParams) => {
            console.log('image:loaded');
            this.scale = this.$root.coords().width / imageParams.width;

            this.width = imageParams.width * this.scale;
            this.height = imageParams.height * this.scale;
        });

        this.$on('puzzle:keydown', (e) => {
            console.log('puzzle:keydown', e);
        });

        this.$on('slider:change', size => {
            console.log('size', size);
        });
    }

    toHTML() {
        return create();
    }
}

export default PuzzleBoard;
