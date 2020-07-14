// app styles
import '@/scss';

// puzzle plugin
import { PuzzleGame } from '@puzzle/PuzzleGame';

new PuzzleGame('#puzzle', {
    image: 'http://cs.pikabu.ru/images/jobseeker/logo2.png',
    slider: true,
    size: 5
});
