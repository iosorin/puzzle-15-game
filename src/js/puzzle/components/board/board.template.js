import { createTile } from './tile.template';

const childStyles = ({ image, width, height } = {}) => {
    if (!image) return '';

    return (
        `
            <style>
                .puzzle-game__board {
                    width: ${width}px;
                    height: ${height}px;
                }

                .puzzle-game__board > div {
                    background-image: url(${ image.src });
                    background-size: ${ width }px ${ height }px;
                }
            </style>
        `
    );
};

const createBoard = ({ image, size = 0, width, height, margin } = {}) => {
    if (!size) return 'no size';

    const styles = childStyles({ image, width, height });
    const count = Math.pow(size, 2);

    const tiles = Array(count).fill(0)
        .map((_, index) => {
            return createTile({
                index,
                col: Math.floor(index / size),
                row: index % size,
                size, margin,
                width, height
            });
        })
        .slice(1)
        .join('');

    return (
        `
            ${ styles }
            ${ tiles }
        `
    );

};

export {
    createBoard
};
