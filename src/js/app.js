// app styles
import '@/scss';

// puzzle plugin
import { PuzzleGame } from './puzzle/PuzzleGame';

const game = new PuzzleGame('#puzzle', {
    image: 'http://cs.pikabu.ru/images/jobseeker/logo2.png',
    slider: true,
    size: 5
});

game.init = game.init.bind(game);

document.addEventListener('DOMContentLoaded', game.init);
