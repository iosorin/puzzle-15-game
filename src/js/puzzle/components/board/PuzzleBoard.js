import { createBoard } from './board.template';
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

    get template() {
        return createBoard(this.state);
    }

    init() {
        super.init();

        this.listen();
    }


    listen() {
        this.$on('image:loaded', (imageParams) => {
            this.scale = this.$root.coords().width / imageParams.width;

            this.width = imageParams.width * this.scale;
            this.height = imageParams.height * this.scale;

            this.setState({ image: imageParams });
        });

        this.$on('puzzle:keydown', (e) => {});

        this.$on('slider:change', (size) => {});
    }

    toHTML() {
        return this.template;
    }
}

export default PuzzleBoard;
