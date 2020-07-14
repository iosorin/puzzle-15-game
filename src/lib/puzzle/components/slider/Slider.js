import { BaseComponent } from '@puzzle/core/BaseComponent';
import { create } from './slider.template';

class PuzzleSlider extends BaseComponent {
    static className = 'puzzle-game__slider';

    constructor($root, emitter, config) {
        const listeners = ['change'];

        super($root, {
            listeners,
            emitter
        });

        this.min = config.min;
        this.max = config.max;
        this.size = config.size;
        this.show = !!config.slider;
    }

    init() {
        super.init();

        this.updateSize();
    }

    updateSize(size = this.size) {
        this.size = inInterval(size, this.min, this.max);

        this.$emit('size:changed', this.size);
    }

    onChange(e) {
        this.updateSize(e.target.value);
    }

    toHTML() {
        if (!this.show) return '';

        return create(this.size, this.min, this.max);
    }
}

function inInterval(value, min, max) {
    if (value < min) {
        return min;
    }

    return (value > max) ? max : value;
}

export default PuzzleSlider;
