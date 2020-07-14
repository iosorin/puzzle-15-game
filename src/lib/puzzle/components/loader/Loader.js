import { BaseStateComponent } from '@puzzle/core/BaseStateComponent';
import { create } from './loader.template';

class PuzzleLoader extends BaseStateComponent {
    constructor($root, options) {
        super($root, options);
    }

    get template() {
        return create(this.state?.loading);
    }

    init() {
        super.init();

        this.setState({
            loading: true
        });

        // create "board:created" event instead
        this.$on('image:loaded', () => {
            this.setState({
                loading: false
            });
        });

        this.$on('image:change', () => {
            this.setState({
                loading: true
            });
        });
    }

    toHTML() {
        return this.template;
    }
}

export default PuzzleLoader;
