import { combineLatest, of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

const observables = [1, 5, 10].map( n => of(n).pipe( // 배열을 옵저버블로 방출합니다.
    delay(n * 1000),
    startWith(0)
)); // 0을 즉시 방출 후 n초 후에 n을 방출합니다.
const combined = combineLatest(observables);
combined.subscribe(value => console.log(value));
/* Output
[ 0, 0, 0 ] // 즉시 방출
[ 1, 0, 0 ] // 1초 후
[ 1, 5, 0 ] // 5초 후
[ 1, 5, 10 ] // 10초 후
 */