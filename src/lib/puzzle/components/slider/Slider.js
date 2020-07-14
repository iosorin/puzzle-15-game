import { BaseComponent } from '@puzzle/core/BaseComponent';
import { create } from './slider.template';

class PuzzleSlider extends BaseComponent {
    static className = 'puzzle-game__slider';

    constructor($root, options) {
        const listeners = ['change'];

        super($root, {
            listeners,
            ...options
        });

        this.config = options.config;
        this.size = this.config.size;
    }

    init() {
        super.init();

        // this.updateSize();
    }

    updateSize(size = this.size) {
        this.size = parseInt(inInterval(size, this.config.min, this.config.max), 10);

        this.store.save({
            size: this.size
        });

        this.$emit('size:changed', this.size);
    }

    onChange(e) {
        this.updateSize(e.target.value);
    }

    toHTML() {
        if (!this.config.slider) return ' ';

        return create(this.size, this.config.min, this.config.max);
    }
}

function inInterval(value, min, max) {
    if (value < min) {
        return min;
    }

    return (value > max) ? max : value;
}

export default PuzzleSlider;
