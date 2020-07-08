import { BaseComponent } from '@puzzle/core/BaseComponent';

class PuzzleImage extends BaseComponent {
    static tagName = "style";

    constructor($root, emitter, options) {
        super($root, {
            name,
            emitter
        });

        this.src = options.image;
        this.width = 0;
        this.height = 0;
    }

    async init() {
        await this.load(this.src).then((image) => {
            const [width, height] = [image.naturalWidth, image.naturalHeight];

            this.image = image;
            this.width = width;
            this.height = height;

            this.$emit('image:loaded', { image, width, height });
        });
    }

    load(url) {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = url;

            image.addEventListener('load', function() {
                resolve(this);
            }, false);
        });
    }

    toHTML() {
        return `
            .puzzle-game__board > div {
                background-image: url(${ this.src })
            }
        `;
    }
}

export default PuzzleImage;
