import { BaseComponent } from '@core/BaseComponent';
import { BoardMoveController } from './BoardMoveController';
import { BoardTile } from './BoardTile';
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

        this.$on('puzzle:keydown', (direction) => this.onMove(direction));
        this.$on('puzzle:shuffle', (delay) => this.moveController.shuffle(delay));
        this.$on('puzzle:resolve', () => this.moveController.resolve());
        this.$on('history:changed', ({ tiles }) => this.moveController.moveTiles(tiles));
        this.$on('image:loaded', (imageParams) => this.onImageLoaded(imageParams));
        this.$on('size:changed', (size) => this.createBoard(size));
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

    onMove(e) {
        const tiles = this.moveController.getEventTiles(e);

        if (tiles) {
            this.$emit('history:push', tiles);

            const resolved = this.moveController.moveTiles(tiles);

            if (resolved) {
                this.$emit('board:resolved');

                return;
            }
        }
    }

    onClick(event) {
        this.onMove(event);
    }

    toHTML() {
        return ' ';
    }
}

export default PuzzleBoard;
