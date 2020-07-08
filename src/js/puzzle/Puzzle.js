import * as utils from "./core/utils";
import { PuzzleCell } from './core/PuzzleCell';
import { PuzzleHistory } from './core/PuzzleHistory';

export class Puzzle {
    constructor({ $container, image, background }) {
        this.src = image;
        this.$container = $container;
        this.background = background;
        this.shuffleTimeout = 1000;

        this.cols = 5;
        this.rows = 5;
        this.cells = [];

        this.canvas = null;
        this.ctx = null;
        this.history = null;
        this.emptyCell = {};

        this.destroyed = false;
    }

    async init() {
        await this.loadImage();

        PuzzleCell.image = this.image;

        this.createCanvas();

        this.render();

        await this.setHistory();

        this.bindEvents();
    }

    loadImage() {
        return new Promise((resolve) => {
            this.image = new Image();
            this.image.src = this.src;

            this.image.addEventListener('load', function() {
                resolve(this);
            }, false);
        });
    }

    createCanvas() {
        const width = this.image.naturalWidth;
        const height = this.image.naturalHeight;

        this.canvas = document.createElement('canvas');
        this.canvas.className = 'puzzle-canvas';
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext('2d');
        this.clean();

        this.$container.appendChild(this.canvas);
    }

    createCells() {
        this.cells = [];

        const width = Math.ceil(this.canvas.width / this.cols);
        const height = Math.ceil(this.canvas.height / this.rows);

        for (let col = 0; col < this.cols; col+=1) {
            for (let row = 0; row < this.rows; row+=1) {
                const cell = new PuzzleCell(
                    {
                        col, row,
                        id: `${row}:${col}`,
                        width, height,
                        border: 5

                    }
                );

                this.cells.push(cell);
            }
        }

        this.emptyCell = this.cells[this.cells.length - 1];
        this.emptyCell.empty = true;
    }

    loadCells(cells) {
        this.cells = cells.map(cell => new PuzzleCell(cell));
        this.emptyCell = this.cells.find(cell => cell.empty);
    }

    drawCells() {
        this.cells.forEach((cell) => {
            cell.update();
            cell.draw(this.ctx);
        });
    }

    swapCells(a, b) {
        const colTemp = a.col;
        const rowTemp = a.row;

        [a.col, a.row] = [b.col, b.row];
        [b.col, b.row] = [colTemp, rowTemp];
    }

    shuffle(tm = this.shuffleTimeout, sort = true) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.cells
                    .sort((a, b) => {
                        this.swapCells(a, b);

                        return Math.random() - 0.5;
                    });

                if (sort) {
                    this.cells = utils.sort(this.cells, 'col', 'row');
                }

                this.history.clear();

                resolve();
            }, tm);
        });
    }

    resolve() {
        this.cells.forEach((cell) => {
            [cell.row, cell.col] = cell.id.split(':');
        });
    }

    moveCells(target, save = true) {
        if (!target) {
            return;
        }

        this.swapCells(target, this.emptyCell);

        if (save) {
            this.history.save([target, this.emptyCell]);
        }

        this.cells = utils.sort(this.cells, 'col', 'row');
    }

    async setHistory() {
        this.history = new PuzzleHistory();

        this.createCells();

        await this.shuffle();

        this.history.clear();
        this.history.setup(this.cells);
    }

    undo() {
        this.undoRedo('undo');
    }

    redo() {
        this.undoRedo('redo');
    }

    undoRedo(direction = "undo") {
        const cell = this.history[direction]();

        if (cell) {
            const cellIntance = this.cells.find(c => c.id === cell.id);

            this.moveCells(cellIntance, false);
        }
    }

    clean() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        if (!this.destroyed) {
            window.requestAnimationFrame(() => this.render());
        }

        this.clean();
        this.drawCells();
    }

    changeSize(value) {
        value = +value;

        if (Number.isInteger(value)) {
            this.rows = value;
            this.cols = value;

            this.createCells();
            this.shuffle();
        }
    }

    onKeydown(e) {
        const key = e.key.toLowerCase().replace('arrow', '');

        if (!key) return;

        // empty cell index
        const index = this.cells.findIndex(t => t.empty);

        // limited directions index`s
        const directions = {
            down: (this.emptyCell.row !== 0) && (index - 1),
            up: (this.emptyCell.row !== this.rows - 1) && (index + 1),
            right: (index - this.rows >= 0) && index - this.rows,
            left: ((index + this.rows) < (this.cols * this.rows)) && (index + this.rows)
        };

        // target index
        const target = directions[key];

        this.moveCells(this.cells[target]);
    }

    onClick(e) {
        const scale = this.canvas.offsetWidth / this.canvas.width;

        const mouse = {
            x: parseInt((e.pageX - (this.canvas.offsetLeft)) / scale),
            y: parseInt((e.pageY - (this.canvas.offsetTop)) / scale)
        };

        const clicked = this.cells.find((cell) => {
            return cell.isClicked(mouse);
        });

        if (clicked) {
            const dist = utils.distance(clicked, this.emptyCell);

            if (dist === this.cells[0].width) {
                this.moveCells(clicked);
            }
            else {
                clicked.shake();
            }
        }
    }

    bindEvents() {
        document.addEventListener('click', (e) => this.onClick(e));
        document.addEventListener('keydown', (e) => this.onKeydown(e));
    }

    destroy() {
        document.removeEventListener('click', (e) => this.onClick(e));
        document.removeEventListener('keydown', (e) => this.onKeydown(e));

        this.destroyed = true;
    }
}
