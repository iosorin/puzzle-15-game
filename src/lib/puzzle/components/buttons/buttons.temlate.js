import { locale } from '@puzzle/constants';
const toButton = (button) => {
    return `
        <div
            class="button"
            data-action='${ button.value }'
            ${ button.disabled ? 'disabled' : '' }
        >
            ${ button.title ? `<span> ${ button.title } </span>` : ''}
            ${ button.icon ? `<i class="material-icons">${button.icon}</i>` : ''}
        </div>
    `;
};

const create = (state = {}) => {
    if (!state.buttons?.length) return ' ';

    const buttons = [
        {
            value: 'undo',
            title: locale.buttons.undo,
            disabled: !state.undo
        },
        {
            value: 'redo',
            title: locale.buttons.redo,
            disabled: !state.redo
        },
        {
            value: 'shuffle',
            title: locale.buttons.shuffle,
            disabled: false
        },
        {
            value: 'resolve',
            title: locale.buttons.resolve,
            disabled: false
        },
        {
            value: 'changeImage',
            title: locale.buttons.changeImage,
            disabled: false,
            icon: 'wallpaper'
        }
    ];

    return state.buttons
        .map(btn => buttons.find(b => b.value === btn))
        .map(toButton)
        .join('');
};

export {
    create
};
