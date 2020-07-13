import { CommandManager } from '@core/CommandManager';
import { BaseComponent } from '@core/BaseComponent';

class PuzzleHistory extends BaseComponent {
    constructor(_, emitter) {
        super(window, { emitter });

        this.clear();
    }

    init() {
        super.init();

        this.$on('history:push', (e) => this.set(e));
        this.$on('history:undo', () => this.undo());
        this.$on('history:redo', () => this.redo());
        this.$on('history:clear', () => this.clear());
        this.$on('puzzle:shuffle', () => this.clear());
    }

    set(tiles) {
        CommandManager.execute({
            execute: () => {
                this.current++;
                this.history.push(tiles);
            },
            unexecute: () => {
                this.current--;
                this.history.pop();
            }
        });
    }

    undo() {
        this.$emit('history:changed', this.history[this.history.length - 1]);

        if (this.history.length === 0) return;

        CommandManager.undo();
    }

    redo() {
        if (this.current < this.history.length - 1) return;

        CommandManager.redo();

        this.$emit('history:changed', this.history[this.history.length - 1]);
    }

    clear() {
        this.current = 0;
        this.history = [];
    }
}

export default PuzzleHistory;
