const toButton = (action, state) => {
    const disabled = action in state && !state[action];

    return `
        <button
            class="puzzle-game__button"
            data-action='${ action }'
            ${ disabled ? 'disabled' : '' }
        >
            ${ action }
        </button>
    `;
};

const create = (state = {}) => {
    if (!state.buttons?.length) return ' ';

    return state.buttons
        .map(action => toButton(action, state))
        .join('');
};

export {
    create
};
