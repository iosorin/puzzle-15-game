import { BaseComponent } from '@puzzle/core/BaseComponent';
import { BoardTile } from './BoardTile';
import { BoardMoveController } from './BoardMoveController';
import { createStyles } from './createStyles';

class PuzzleBoard extends BaseComponent {
    static className = 'puzzle-game__board';

    constructor($root, emitter, options) {
        super($root, {
            listeners: ['click'],
            emitter
        });

        this.options = options;

        this.width = 0;
        this.height = 0;
        this.emptyIdx = 0;
        this.tiles = [];
    }

    init() {
        super.init();

        this.moveController = new BoardMoveController(this.tiles, this.options.shuffleDelay);

        this.$on('size:changed', (size) => this.createBoard(size));
        this.$on('image:loaded', (imageParams) => this.onImageLoaded(imageParams));
        this.$on('puzzle:move', (direction) => this.directionMove(direction));
        this.$on('puzzle:shuffle', () => this.moveController.shuffle(0));
        this.$on('puzzle:resolve', () => this.moveController.resolve());
    }

    onImageLoaded(params) {
        const scale = this.$root.coords().width / params.width;

        const width = params.width * scale;
        const height = params.height * scale;

        this.width = width;
        this.height = height;
        this.image = params;

        this.createBoard();
    }

    createBoard(size = this.options.size) {
        this.$root.clear();

        this.$root.append(createStyles(this.image, this.width, this.height));

        this.tiles = Array(Math.pow(size, 2))
            .fill(0)
            .map((_, index) => {
                const tile = new BoardTile({
                    size,
                    index,
                    width: this.width,
                    height: this.height,
                    empty: (index === this.emptyIdx)
                });

                return tile;
            });


        this.tiles.forEach(tile => this.$root.append(tile.el));

        this.moveController.tiles = this.tiles;
        this.moveController.shuffle();
    }

    onClick(e) {
        if (!e.target) return;

        const solved = this.moveController.moveTile(e.target);

        if (solved) {
            this.$emit('board:resolved');
        }
    }

    directionMove(direction) {
        const solved = this.moveController.moveTile(direction);

        if (solved) {
            this.$emit('board:resolved');
        }
    }
}

export default PuzzleBoard;
