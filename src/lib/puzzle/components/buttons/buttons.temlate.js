const createButton = (btn, canUndo, canRedo) => {
    const undoDisabled = btn === 'undo' && !canUndo;
    const redoDisabled = btn === 'redo' && !canRedo;

    const disabled = (undoDisabled || redoDisabled) ? 'disabled' : '';

    return `<button data-action="${ btn }" ${ disabled} >${ btn }</button>`;

};

const create = ({ buttons, canUndo, canRedo } = {}) => {
    if (buttons) {
        return buttons
            .map(btn => createButton(btn, canUndo, canRedo))
            .join('');
    }

    return ' ';
};

export {
    create
};
