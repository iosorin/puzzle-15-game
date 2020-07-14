import { storage } from '@core/utils';

export class LocalStorageClient {
    constructor(key = 'puzzle-game-store') {
        this.key = key;

        this.state = this.get();
    }

    save(newState) {
        this.state = { ...this.state, ...newState };

        storage(this.key, this.state);
    }

    get() {
        return storage(this.key);
    }

    clear() {
        this.state = {};
    }
}
