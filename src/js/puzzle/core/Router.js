export default class PuzzleRouter {
    constructor() {
        this.init();
    }

    static get path() {
        return window.location.hash.slice(1);
    }

    static get param() {
        return PuzzleRouter.path.split('/')[1];
    }

    init() {
        this.bindEvents();
        this.navigate(this.step);
    }

    navigate(path) {
        window.location.hash = path;
    }

    bindEvents() {
        window.addEventListener('hashchange', () => {
        });
    }
}
