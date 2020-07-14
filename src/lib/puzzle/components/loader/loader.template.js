const create = (state) => {
    return `
        <div class="puzzle-game__loader ${ state ? 'active' : '' }">
            <div class="loader">
                <div></div>
                <div></div>
            </div>
        </div>
    `;
};

export {
    create
};
