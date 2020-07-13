// Todo: implement ctrl-z/ctrl-y

const keymap = {
    38: 'moveDown',
    87: 'moveDown',
    40: 'moveUp',
    83: 'moveUp',
    37: 'moveRight',
    65: 'moveRight',
    39: 'moveLeft',
    68: 'moveLeft'
};

const options = {
    image: 'https://picsum.photos/500/500',
    buttons: ['shuffle', 'resolve', 'undo', 'redo'],
    shuffleDelay: 1000,
    slider: false,
    size: 5,
    min: 2,
    max: 10
};

export {
    keymap,
    options
};
