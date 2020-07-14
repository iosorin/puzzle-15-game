const config = {
    buttons: ['shuffle', 'resolve', 'undo', 'redo'],
    image: 'https://picsum.photos/500/500',
    shuffleDelay: 1000,
    slider: true,
    size: 5,
    max: 10,
    min: 2
};

const keymap = {
    38: 'move:down',
    87: 'move:down',
    40: 'move:up',
    83: 'move:up',
    37: 'move:right',
    65: 'move:right',
    39: 'move:left',
    68: 'move:left',
    cmd_90: 'history:undo',
    cmd_89: 'history:redo'
};

const confirmMessage = 'Well done, the puzzle is assembled! Do you want to play again?';

export {
    keymap,
    config,
    confirmMessage
};
