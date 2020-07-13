import { BaseComponent } from '@puzzle/core/BaseComponent';

class PuzzleImage extends BaseComponent {
    constructor($root, emitter, options) {
        super($root, {
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

            const imageParams = {
                src: image.src,
                width,
                height
            };

            this.$emit('image:loaded', imageParams);
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
}

export default PuzzleImage;
