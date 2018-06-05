import { interval } from 'rxjs';
import { take, concatMapTo } from 'rxjs/operators';

const source = interval(300).pipe(take(3));
const result = source.pipe(
    concatMapTo(interval(1000).pipe(take(4)))
);
result.subscribe(x => console.log(x));