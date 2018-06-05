import { of, interval } from 'rxjs';
import { delayWhen } from 'rxjs/operators';

const source = of('ONE', 'TWO', 'THREE');
const delayedSource = source.pipe(
    delayWhen(() => interval(Math.random() * 5000) )
);
delayedSource.subscribe(x => console.log(x));