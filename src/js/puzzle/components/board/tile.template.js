import { toInlineStyles } from '@puzzle/core/utils';

const createTile = (state) => {
    if (!state) return '';

    const {
        index,
        col, row,
        size, margin,
        width: boardWidth,
        height: boardHeight
    } = state;

    const width = boardWidth / size - margin;
    const height = boardHeight / size - margin;

    const top = col * height + margin * 2;
    const left = row * width + margin * 2;

    const backgroundPositionX = -(index % size) * width + 0; // margin
    const backgroundPositionY = -Math.floor(index / size) * height + 0; // margin

    const style = toInlineStyles({
        top, left,
        width, height,
        backgroundPositionX,
        backgroundPositionY
    }, 'px');

    return (
        `
            <div class="puzzle-game__tile" style="${ style }";></div>
        `
    );
};

export {
    createTile
};
