import { $ } from '@core/dom';

export class BoardMoveController {
    constructor(tiles = [], shuffleDelay) {
        this.tiles = tiles;
        this.shuffleDelay = shuffleDelay;
    }

    get emptyTile() {
        return this.tiles.find(tile => tile.empty);
    }

    swap(tiles) {
        if (!tiles?.length) return;

        const [a, b] = tiles;
        const tempCol = a.col;
        const tempRow = a.row;

        [a.col, a.row] = [b.col, b.row];
        [b.col, b.row] = [tempCol, tempRow];

        return [a, b];
    }

    shuffle(delay = this.shuffleDelay) {
        this.tiles = shuffleFisherYates(this.tiles)
            .map((tile, index, arr) => {
                const next = arr[index + 1];

                if (next) {
                    this.swap([tile, next]);
                }

                return tile;
            });

        setTimeout(() => {
            this.animate(this.tiles);
        }, delay);
    }

    resolve() {
        this.tiles = this.tiles
            .sort((a, b) => a.index - b.index)
            .map((tile) => {
                [tile.col, tile.row] = tile.el.id(true);
                return tile;
            });

        this.animate(this.tiles);
    }

    checkResolved() {
        return !!this.tiles.every((tile) => {
            const [col, row] = tile.el.id(true);
            return tile.col === col && tile.row === row;
        });
    }

    // TODO: add async waiting for animation end
    animate(tiles) {
        if (!tiles) return;

        tiles.forEach(tile => tile.update());
    }

    moveTiles(tiles) {
        this.animate(this.swap(tiles));

        return this.checkResolved();
    }

    getEventTiles(e) {
        if (!e) return;

        return e.target ? this.clickTarget(e.target) : this.keydownTarget(e);
    }

    keydownTarget(direction) {
        direction = direction.toLowerCase().replace('move:', '');

        const { col, row } = this.emptyTile;

        const positions = {
            left: { col, row: row - 1 },
            right: { col, row: row + 1 },
            up: { col: col - 1, row },
            down: { col: col + 1, row }
        };

        const target = this.tiles.find((tile) => {
            return tile.col === positions[direction].col
                && tile.row === positions[direction].row;
        });

        if (target) {
            return [target, this.emptyTile];
        }

        return;
    }

    clickTarget(tile) {
        let canMove = false;

        const id = $(tile).id();
        const target = this.tiles.find(tile => tile.id === id);

        if (!target) return;

        const { col, row } = this.emptyTile;

        if (target.col === col) {
            canMove = Math.abs(target.row - row) === 1;
        }
        else if (target.row === row) {
            canMove = Math.abs(target.col - col) === 1;
        }

        if (canMove) {
            return [target, this.emptyTile];
        }
        else {
            target.shake();
        }
    }
}

function shuffleFisherYates(array) {
    let i = array.length;

    while (i--) {
        const ri = Math.floor(Math.random() * (i + 1));
        [array[i], array[ri]] = [array[ri], array[i]];
    }

    return array;
}
