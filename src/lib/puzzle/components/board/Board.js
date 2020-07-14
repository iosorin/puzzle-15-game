import { BaseComponent } from '@core/BaseComponent';
import { BoardMoveAssistant } from './BoardMoveAssistant';
import { BoardTile } from './BoardTile';
import { createStyles } from './createStyles';
import { debounce } from '@core/utils';

class PuzzleBoard extends BaseComponent {
    static className = 'puzzle-game__board';

    constructor($root, options) {
        super($root, {
            listeners: ['click'],
            ...options
        });

        this.config = options.config;

        this.width = 0;
        this.height = 0;
        this.emptyIdx = 0;
        this.tiles = [];
    }

    init() {
        super.init();

        this.moveAssistant = new BoardMoveAssistant(this.tiles);

        this.$on('puzzle:keydown', (e) => this.onKeydown(e));
        this.$on('puzzle:resolve', () => this.actionHandler('resolve'));
        this.$on('puzzle:shuffle', (e) => this.actionHandler('shuffle', e));
        this.$on('puzzle:resize', (e) => this.onResize(e));
        this.$on('puzzle:hashchange', (e) => this.onHashChanged(e));
        this.$on('image:loaded', (params) => this.onImageLoaded(params));
        this.$on('size:changed', (size) => this.createBoard(size, true));
        this.$on('history:changed', (e) => this.moveFromHistory(e));

        this.moveFromHistory = debounce(this.moveFromHistory.bind(this), 10);
    }

    get coords() {
        const par = this.$root.parent().coords().width;
        const scale = par / this.image.width;

        const width = this.image.width * scale;
        const height = this.image.height * scale;

        return { width, height };
    }

    get history() {
        return this.store.get()?.history || {};
    }

    onImageLoaded(params) {
        this.image = params;

        const { width, height } = this.coords;

        this.width = width;
        this.height = height;

        this.createBoard();
    }

    createBoard(size = this.config.size, sizeEvt = false) {
        this.$root.clear();
        this.$root.append(createStyles(this.image, this.width, this.height));

        const loadFromStore = Object.keys(this.history).length && !sizeEvt;

        this.tiles = Array(Math.pow(size, 2))
            .fill(0)
            .map((_, index) => {
                const tile = new BoardTile({
                    size,
                    index,
                    boardWidth: this.width,
                    boardHeight: this.height,
                    empty: (index === this.emptyIdx)
                });

                return tile;
            });

        if (loadFromStore) {
            this.merge(this.store.get()?.tiles);
        }

        this.tiles.forEach(tile => this.$root.append(tile.el));
        this.moveAssistant.tiles = this.tiles;

        this.boardCreated(!loadFromStore);
    }

    boardCreated(shuffleAfter = true) {
        if (shuffleAfter) {
            this.actionHandler('shuffle', this.config.shuffleDelay);
        }
        else {
            this.moveAssistant.animate(this.tiles);
            this.navigate();
        }

        this.$emit('history:watch', {
            tiles: this.tiles
        });
    }

    merge(tiles) {
        if (tiles) {
            this.tiles = this.tiles.map((tile) => {
                const stored = tiles.find(s => s.id === tile.id);

                if (stored) {
                    const temp = tile.el;
                    Object.assign(tile, stored);
                    tile.el = temp;
                }

                return tile;
            });
        }
    }

    resetHistory() {
        this.store.clear();

        this.$emit('history:reset');
        this.$emit('history:watch', {
            tiles: this.tiles
        });
    }

    actionHandler(action, params) {
        this.resetHistory();
        this.navigate();

        this.moveAssistant[action](params);
    }

    navigate() {
        // TODO - add nullish (??) babel plugin
        this.router.navigate(this.history.current || 0);
    }

    moveFromHistory({ tiles } = {}) {
        if (tiles) {
            // get instance
            tiles = this.tiles.filter(t => tiles.find(tile => tile.id === t.id));

            // move tiles
            this.moveAssistant.moveTiles(tiles);

            this.navigate();
        }
    }

    async moveFromEvent(e) {
        const tiles = this.moveAssistant.getEventTiles(e);

        if (tiles) {
            const { resolved, tiles: moved } = await this.moveAssistant.moveTiles(tiles);

            this.$emit('history:push', moved);

            if (resolved) {
                this.$emit('board:resolved');

                return;
            }

        }
    }

    onClick(evt) {
        this.moveFromEvent(evt);
    }

    onKeydown(evt) {
        if (evt.includes('move')) {
            this.moveFromEvent(evt);
        }
        else {
            this.$emit(evt);
        }
    }

    onHashChanged(forward) {
    }

    onResize() {
        const { width, height } = this.coords;
        const $newStyles = createStyles(this.image, width, height);

        this.$root.replace($newStyles, 'style');
        this.moveAssistant.animate(this.tiles, { width, height });
        this.resetHistory();
    }

    toHTML() {
        return ' ';
    }
}

export default PuzzleBoard;
