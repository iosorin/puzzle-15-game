import { BaseComponent } from '@core/BaseComponent';
import { BoardMoveController } from './BoardMoveController';
import { BoardTile } from './BoardTile';
import { createStyles } from './createStyles';

class PuzzleBoard extends BaseComponent {
    static className = 'puzzle-game__board';

    constructor($root, emitter, config) {
        super($root, {
            listeners: ['click'],
            emitter
        });

        this.config = config;

        this.width = 0;
        this.height = 0;
        this.emptyIdx = 0;
        this.tiles = [];
    }

    init() {
        super.init();

        this.moveController = new BoardMoveController(this.tiles, this.config.shuffleDelay);

        this.$on('puzzle:keydown', (e) => this.onKeydown(e));
        this.$on('puzzle:shuffle', (delay) => this.moveController.shuffle(delay));
        this.$on('puzzle:resolve', () => this.moveController.resolve());
        this.$on('image:loaded', (params) => this.onImageLoaded(params));
        this.$on('size:changed', (size) => this.createBoard(size));
        this.$on('history:changed', ({ tiles }) => this.onHistoryChanged(tiles));
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

    createBoard(size = this.config.size) {
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

    onHistoryChanged(tiles) {
        if (!tiles) return;

        // get instance
        tiles = this.tiles.filter(t => tiles.find(tile => tile.id === t.id));

        // move tiles
        this.moveController.moveTiles(tiles);
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

    onKeydown(event) {
        if (event.includes('move')) {
            this.onMove(event);
        }
        else {
            this.$emit(event);
        }
    }

    toHTML() {
        return ' ';
    }
}

export default PuzzleBoard;
