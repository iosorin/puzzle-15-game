// app styles
import '@/scss';

// puzzle plugin
import { PuzzleGame } from './puzzle/PuzzleGame';

const game = new PuzzleGame('#puzzle', {
    size: 5,
    slider: true,
    image: 'http://cs.pikabu.ru/images/jobseeker/logo2.png'
});

game.init = game.init.bind(game);
document.addEventListener('DOMContentLoaded', game.init);
