// app styles
import '@/scss';

// puzzle plugin
import { PuzzleGame } from '@puzzle/PuzzleGame';

new PuzzleGame('#puzzle', {
    image: 'https://picsum.photos/400?grayscale',
    slider: true,
    size: 5
});
