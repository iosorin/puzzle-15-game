import { CommandManager } from '@core/CommandManager';
import { BaseComponent } from '@core/BaseComponent';
import { storage } from '@core/utils';

// TODO: correct redo disabled state
class PuzzleHistory extends BaseComponent {
    constructor(_, emitter) {
        super(window, { emitter });
    }

    init() {
        super.init();

        this.$on('history:push', (e) => this.push(e));
        this.$on('history:undo', () => this.undo());
        this.$on('history:redo', () => this.redo());
        this.$on('history:clear', () => this.initState());
        this.$on('puzzle:shuffle', () => this.initState());

        this.initState();
    }

    get state() {
        return storage('puzzle-game-history');
    }

    set state(history) {
        storage('puzzle-game-history', history);
    }

    setState() {
        this.current = this.state.length - 1;
        this.history = this.state;
    }

    initState() {
        this.state = [];
        this.current = 0;
        this.history = [];

        this.$emit('history:changed', {
            undo: false,
            redo: false
        });
    }

    push(tiles) {
        CommandManager.execute({
            execute: () => {
                this.current++;
                this.history.push(tiles);
                this.state = [...this.history];

                this.$emit('history:changed', {
                    undo: true,
                    redo: true  // remove
                });
            },
            unexecute: () => {
                this.current--;
                this.history.pop();
                // this.state = this.history;

                if (this.current === 0) {
                    this.$emit('history:changed', {
                        undo: false
                    });
                }
            }
        });
    }

    undo() {
        this.$emit('history:changed', {
            tiles: this.state[this.history.length - 1]
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
                tiles: this.state[this.history.length - 1]
            });
        }
    }
}

export default PuzzleHistory;
