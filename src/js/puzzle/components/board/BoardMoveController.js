import { $ } from '@puzzle/core/dom';

export class BoardMoveController {
    constructor(tiles = [], shuffleDelay) {
        this.tiles = tiles;
        this.shuffleDelay = shuffleDelay;
    }

    get emptyTile() {
        return this.tiles.find(tile => tile.empty);
    }

    shuffle() {
        this.tiles = shuffleFisherYates(this.tiles)
            .map((tile, index, arr) => {
                const next = arr[index + 1];

                if (next) {
                    this.swap(tile, next);
                }

                return tile;
            });

        setTimeout(() => {
            this.animate(this.tiles);
        }, this.shuffleDelay);
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

    swap(a, b) {
        const tempCol = a.col;
        const tempRow = a.row;

        [a.col, a.row] = [b.col, b.row];
        [b.col, b.row] = [tempCol, tempRow];

        return [a, b];
    }

    moveTile(tile) {
        let canMove = false;

        const id = $(tile).id();
        const target = this.tiles.find(tile => tile.id === id);

        const { col, row } = this.emptyTile;

        if (target.col === col) {
            canMove = Math.abs(target.row - row) === 1;
        }
        else if (target.row === row) {
            canMove = Math.abs(target.col - col) === 1;
        }

        if (canMove) {
            this.animate(this.swap(target, this.emptyTile));
        }
        else {
            target.shake();
        }
    }

    moveIn(direction) {
        direction = direction.toLowerCase().replace('move', '');

        const { col, row } = this.emptyTile;

        const positions = {
            up: { col, row: row - 1 },
            down: { col, row: row + 1 },
            left: { col: col - 1, row },
            right: { col: col + 1, row }
        };

        const target = this.tiles.find((tile) => {
            return tile.col === positions[direction].col
                && tile.row === positions[direction].row;
        });

        if (target) {
            this.animate(this.swap(target, this.emptyTile));
        }
    }

    animate(tiles) {
        if (tiles) {
            tiles.forEach(tile => tile.update());
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
