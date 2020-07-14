import { BaseComponent } from '@core/BaseComponent';

class PuzzleImage extends BaseComponent {
    constructor($root, options) {
        super($root, options);

        this.src = options.config.image;
        this.width = 0;
        this.height = 0;
    }

    async init() {
        super.init();

        await this.load(this.src);

        this.$on('image:change', () => {
            const image = 'https://picsum.photos/500/500/?random&t=' + Date.now();

            this.load(image);
        });
    }

    async load(src) {
        await this.loadImage(src).then((image) => {
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
            this.store.save({ image: src });
        });
    }

    loadImage(url) {
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
