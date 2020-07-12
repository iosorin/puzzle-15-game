import { BaseComponent } from "../core/BaseComponent";

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
        this.show = options.slider;
    }

    init() {
        super.init();

        this.updateSize();
    }

    onChange(e) {
        this.updateSize(e.target.value);
    }

    updateSize(size = this.size) {
        this.size = inInterval(size, this.min, this.max);

        this.$emit('slider:change', this.size);
    }

    toHTML() {
        if (!this.show) return '';

        return (
            `
                <input type="range" min="${ this.min }" max="${ this.max }" value="${ this.size || this.cols }">
            `
        );
    }
}

function inInterval(value, min, max) {
    if (value < min) {
        return min;
    }

    return (value > max) ? max : value;
}

export default PuzzleSlider;
