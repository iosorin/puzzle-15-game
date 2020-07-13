import { BaseComponent } from '@puzzle/core/BaseComponent';

class PuzzleHistory extends BaseComponent {
    constructor($root, emitter) {
        super($root, {
            name,
            emitter
        });

        this.history = new Array;
        this.current = -1;
    }

    currentState() {
        return this.history[this.current];
    }

    push(state) {
        if (this.canRedo())
            this.history.splice(this.current + 1);

        this.current++;
        this.history.push(state);
    }

    canUndo() {
        return this.current > 0;
    }

    canRedo() {
        return this.current < this.history.length - 1;
    }

    undo() {
        if (this.canUndo())
            this.current--;
    }

    redo() {
        if (this.canRedo())
            this.current++;
    }
}

export default PuzzleHistory;
