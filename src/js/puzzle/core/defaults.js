const keymap = {
    38: 'moveUp',
    87: 'moveUp',
    40: 'moveDown',
    83: 'moveDown',
    37: 'moveLeft',
    65: 'moveLeft',
    39: 'moveRight',
    68: 'moveRight'
};

const options = {
    image: 'https://picsum.photos/500/500',
    buttons: ['shuffle', 'resolve', 'undo', 'redo'],
    shuffleDelay: 1000,
    slider: false,
    size: 5,
    min: 5,
    max: 10
};

export {
    keymap,
    options
};
