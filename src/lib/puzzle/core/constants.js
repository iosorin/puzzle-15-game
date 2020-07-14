// Todo: implement ctrl-z/ctrl-y

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

const config = {
    image: 'https://picsum.photos/500/500',
    buttons: ['shuffle', 'resolve', 'undo', 'redo'],
    shuffleDelay: 1000,
    slider: true,
    size: 5,
    min: 2,
    max: 10
};

export {
    keymap,
    config
};
