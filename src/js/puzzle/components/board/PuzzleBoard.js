import { createBoard } from './board.template';
import { BaseComponent } from '@puzzle/core/BaseComponent';

class PuzzleBoard extends BaseComponent {
    static className = 'puzzle-game__board';

    constructor($root, emitter, options) {
        super($root, {
            name,
            emitter
        });

        this.options = options;
    }

    get template() {
        return createBoard(this.state);
    }

    init() {
        super.init();

        this.initState({
            width: 0,
            height: 0,
            size: this.options.size,
            margin: this.options.margin
        });

        this.listen();
    }

    listen() {
        this.$on('image:loaded', (imageParams) => {
            const scale = this.$root.coords().width / imageParams.width;

            const width = imageParams.width * scale;
            const height = imageParams.height * scale;

            this.setState({
                width, height,
                image: imageParams
            });
        });

        this.$on('puzzle:keydown', (e) => {});

        this.$on('slider:change', (size) => {
            this.setState({ size });
        });
    }

    toHTML() {
        return this.template;
    }
}

export default PuzzleBoard;
