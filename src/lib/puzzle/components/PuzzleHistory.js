import { $ } from '@core/dom';
import { replaceObjects } from '@core/utils';
import { BaseComponent } from '@core/BaseComponent';

// TODO: переписать на стор с подпиской на события, пофиксить undo/redo на page reload
class PuzzleHistory extends BaseComponent {
    constructor(_, options) {
        super($(window), options);

        this.state = this.getState() || {
            current: 0,
            executed: [],
            unexecuted: []
        };

        this.watcheProp = false;
    }

    getState() {
        return this.store.get()?.history;
    }

    setState(newState, upwards = false) {
        if (upwards) {
            this.store.save(newState);

            return;
        }

        this.state = {
            ...this.state,
            ...newState
        };

        this.$emit('history:changed', {
            undo: this.state.executed.length,
            redo: this.state.unexecuted.length
        });

        this.store.save({ history: this.state });
    }

    init() {
        super.init();

        this.$on('history:push', (e) => this.push(e));
        this.$on('history:undo', () => this.undo());
        this.$on('history:redo', () => this.redo());
        this.$on('history:watch', (e) => this.watch(e));
        this.$on('history:clear', () => this.clear());
        this.$on('puzzle:shuffle', () => this.clear());
    }

    watch(obj) {
        const key = Object.keys(obj)?.[0];

        if (key) {
            this.setState({
                [key]: obj[key]
            }, true);

            this.watchedProp = key;
        }
    }

    updateWatched(data) {
        if (this.watchedProp) {
            const initial = this.store.get()?.[this.watchedProp];
            const updated = replaceObjects(initial, data, 'id');

            this.setState({
                [this.watchedProp]: updated
            }, true);
        }
    }

    push(data) {
        this.state.current++;
        this.state.executed.push(data);

        this.setState();
        this.updateWatched(data);
        this.$emit('history:changed');
    }

    undo() {
        const cmd = this.state.executed.pop();

        if (cmd) {
            this.state.current--;
            this.state.unexecuted.push(cmd);

            this.setState();
            this.$emit('history:changed', { tiles: cmd });
        }

    }

    redo() {
        let cmd = this.state.unexecuted.pop();

        if (cmd) {
            this.state.current++;
            this.state.executed.push(cmd);

            this.setState();
            this.$emit('history:changed', { tiles: cmd });
        }
    }

    clear() {
        this.state.executed = [];
        this.state.unexecuted = [];
        this.state.current = 0;

        if (this.watchedProp) {
            this.state[this.watchedProp] = null;
        }

        this.setState();

        this.$emit('history:changed', {
            undo: false,
            redo: false
        });
    }
}

export default PuzzleHistory;
