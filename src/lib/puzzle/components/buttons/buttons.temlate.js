const toButton = (button) => {
    return `
        <button
            class="puzzle-game__button"
            data-action='${ button.action }'
            ${ button.disabled ? 'disabled' : '' }
        >
            ${ button.action }
        </button>
    `;
};

const create = (state = {}) => {
    if (!state.buttons?.length) return ' ';

    const buttons = [
        {
            action: 'shuffle',
            disabled: false
        },
        {
            action: 'resolve',
            disabled: false
        },
        {
            action: 'undo',
            disabled: !state.undo
        },
        {
            action: 'redo',
            disabled: !state.redo
        }
    ];

    return buttons
        .filter(btn => state.buttons?.includes(btn.action))
        .map(toButton)
        .join('');
};

export {
    create
};
