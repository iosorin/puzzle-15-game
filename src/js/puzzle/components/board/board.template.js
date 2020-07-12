const createStyles = (image = {}) => {
    return image ? (
        `
            <style>
                .puzzle-game__board > div {
                    background-image: url(${ image.src })
                }
            </style>
        `
    ) : '';
};

const createBoard = (state = {}) => {
    const styles = createStyles(state.image);

    return `
        ${ styles }
        <div>board</div>
    `;
};

export {
    createBoard
};
