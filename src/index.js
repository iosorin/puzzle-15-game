// app styles
import '@/scss';

// puzzle plugin
import * as Sentry from '@sentry/browser';
import { PuzzleGame } from '@puzzle/PuzzleGame';

Sentry.init({
    dsn: 'https://6ad2920fc8a24721b2d3f25cd5254ff2@o442854.ingest.sentry.io/5453105'
});

new PuzzleGame('#puzzle', {
    image: 'https://picsum.photos/400?grayscale',
    slider: true,
    size: 5
});
