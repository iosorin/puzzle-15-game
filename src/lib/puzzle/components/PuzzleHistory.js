import { CommandManager } from '@core/CommandManager';
import { BaseComponent } from '@core/BaseComponent';


// TODO: pass undo disabled state
class PuzzleHistory extends BaseComponent {
    constructor(_, emitter) {
        super(window, { emitter });

        this.clear();
    }

    init() {
        super.init();

        this.$on('history:push', (e) => this.push(e));
        this.$on('history:undo', () => this.undo());
        this.$on('history:redo', () => this.redo());
        this.$on('history:clear', () => this.clear());
        this.$on('puzzle:shuffle', () => this.clear());
    }

    push(tiles) {
        CommandManager.execute({
            execute: () => {
                this.current++;
                this.history.push(tiles);

                this.$emit('history:changed', {
                    undo: true,
                    redo: true
                });

                console.log('execute', this.current);
            },
            unexecute: () => {
                this.current--;
                this.history.pop();

                if (this.current === 0) {
                    this.$emit('history:changed', {
                        undo: false
                    });
                }

                console.log('unexecute', this.current);
            }
        });
    }

    undo() {
        this.$emit('history:changed', {
            tiles: this.history[this.history.length - 1]
        });

        if (this.history.length === 0) {
            return;
        }

        CommandManager.undo();
    }

    redo() {
        if (CommandManager.unexecuted.length) {

            CommandManager.redo();

            this.$emit('history:changed', {
                tiles: this.history[this.history.length - 1]
            });
        }
    }

    clear() {
        this.current = 0;
        this.history = [];

        this.$emit('history:changed', {
            undo: false,
            redo: false
        });
    }
}

export default PuzzleHistory;
