import { interval, throwError, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

interval(1000).pipe(
    mergeMap(x => x === 13 ? throwError('Thirteens are bad') : of('a', 'b', 'c') )
).subscribe(x => console.log(x), e => console.error(e));