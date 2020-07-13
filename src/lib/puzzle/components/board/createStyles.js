import { $ } from '@core/dom';

const createStyles = (image, width, height) => {
    if (!image?.src) return '';

    const styles = $.create('style');

    styles.html(
        `
            .puzzle-game__board {
                width: ${width}px;
                height: ${height}px;
            }

            .puzzle-game__board > div {
                background-image: url(${ image.src });
                background-size: ${ width }px ${ height }px;
            }
        `
    );

    return styles;
};


export {
    createStyles
};
