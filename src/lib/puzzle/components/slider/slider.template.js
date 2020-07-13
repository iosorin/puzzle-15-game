const create = (size, min, max) => {
    return `<input type="range" min="${ min }" max="${ max }" value="${ size }">`;
};

export {
    create
};
