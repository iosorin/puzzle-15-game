// app styles
import '@/scss';

// puzzle plugin
import { Puzzle } from './puzzle/Puzzle';

function init() {
    const $container = document.querySelector('.js-puzzle-container');

    const image = 'http://cs.pikabu.ru/images/jobseeker/logo2.png';
    const background = getComputedStyle(document.documentElement).getPropertyValue('--grey');
    const puzzle = new Puzzle({ image, background, $container });

    puzzle.init();

    (function bindEvents() {
        const $slider = document.querySelector('.js-puzzle-slider');
        const $buttons = document.querySelectorAll('.js-puzzle-button');

        $slider.addEventListener('change', (e) => puzzle.changeSize(e.target.value));
        $buttons.forEach(btn => btn.addEventListener('click', () => {
            const { action, param } = btn.dataset;
            // eslint-disable-next-line no-unused-expressions
            puzzle[action]?.(param);
        }));
    })();
}

document.addEventListener('DOMContentLoaded', init);
