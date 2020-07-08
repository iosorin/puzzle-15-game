import { Storage } from './Storage';

class ActiveRouter {
    static get path() {
        return window.location.hash.slice(1);
    }

    static get param() {
        return ActiveRouter.path.split('/')[1];
    }

    static navigate(path) {
        window.location.hash = path;
    }
}

export class PuzzleHistory extends Storage {
    static storageKey = 'puzzle-history';

    constructor() {
        super(PuzzleHistory.storageKey);

        this.init();
    }

    init() {
        this.step = this.data.step || 0;
        this.steps = this.data.steps || [];

        ActiveRouter.navigate('step-' + this.step);
    }

    get() {
        return this.data;
    }

    clear() {
        this.step = 0;
        this.steps = [];
        this.cells = [];

        this.update({
            cells: this.cells,
            steps: this.steps,
            step: this.step
        });

        ActiveRouter.navigate('step-' + this.step);
    }

    setup(cells = []) {
        this.update({
            cells,
            steps: this.steps,
            step: this.step
        });

        return cells;
    }

    updateCells(cells = []) {
        if(!cells.length) return;

        cells = this.data.cells.map((saved) => {
            const changed = cells.find(cell => cell.id === saved.id);

            if (changed) {
                return changed;
            }

            return saved;
        });

        this.update({ cells });
    }

    save(cells) {
        this.steps.push(cells);
        this.step += 1;

        this.update({
            steps: this.steps,
            step: this.step
        });

        this.updateCells(cells);

        ActiveRouter.navigate('step-' + this.step);
    }

    onStep({ step, cells }) {
        this.step = step;
        this.update({ step });
        this.updateCells(cells);

        ActiveRouter.navigate('step-' + this.step);
    }

    undo() {
        let step = this.step - 1;
        const cells = this.steps[this.step - 1];

        if (!cells) return;

        if (step < 0) {
            step = 0;
        }

        this.onStep({ step, cells });

        return cells[0];
    }

    redo() {
        let step = this.step;
        const cells = this.steps[step];

        if (!cells) return;

        step += 1;

        this.onStep({ step, cells });

        return cells[0];
    }

    hasChanges() {
        return this.step > 0;
    }
}
