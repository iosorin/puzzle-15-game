import { $ } from '@puzzle/core/dom';

export class BoardTile {
    static className = 'puzzle-game__tile';

    constructor({ size, index, empty, width: boardWidth, height: boardHeight } = {}) {
        this.size = size;
        this.index = index;
        this.empty = empty;

        this.width = boardWidth / size;
        this.height = boardHeight / size;

        this.col = Math.floor(index / size);
        this.row = index % size;
        this.id = `${this.col}:${this.row}`;

        this.shakeAnimation = 600;

        this.init();
    }

    get styles() {
        const top = this.col * this.height;
        const left = this.row * this.width;

        const backgroundPositionX = -(this.index % this.size) * this.width;
        const backgroundPositionY = -Math.floor(this.index / this.size) * this.height;

        return {
            top, left,
            backgroundPositionX,
            backgroundPositionY,
            width: this.width,
            height: this.height
        };
    }

    init() {
        this.el = $.create('div', BoardTile.className);
        this.el.attr('data-id', this.id);

        if (this.empty) {
            this.el.toggleClass('empty', true);
        }

        this.update();
    }

    update() {
        this.el.css(this.styles, 'px');
    }

    shake() {
        this.el.toggleClass('shaking', true);

        setTimeout(() => {
            this.el.toggleClass('shaking', false);
        }, this.shakeAnimation);
    }
}
