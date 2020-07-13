import { BaseComponent } from "@puzzle/core/BaseComponent";
import { create } from './slider.template';

class PuzzleSlider extends BaseComponent {
    static className = 'puzzle-game__slider';

    constructor($root, emitter, options) {
        const listeners = ['change'];

        super($root, {
            name,
            listeners,
            emitter
        });

        this.min = options.min;
        this.max = options.max;
        this.size = options.size;
        this.show = !!options.slider;
    }

    init() {
        super.init();

        this.updateSize();
    }

    updateSize(size = this.size) {
        this.size = inInterval(size, this.min, this.max);

        this.$emit('size:change', this.size);
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
