const createButton = (btn) => {
    return `<button data-action="${ btn }">${ btn }</button>`;
};

const create = (buttons) => {
    return buttons.map(createButton).join('');
};

export {
    create
};
