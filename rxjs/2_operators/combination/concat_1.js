import { interval, range, concat } from 'rxjs';
import { take } from 'rxjs/operators';

const timer = interval(1000).pipe(take(4));
const sequence = range(1, 10);
const result = concat(timer, sequence);
result.subscribe(x => console.log(x));
/* Output
0 // 1초 후에
1 // 2초 후에
2 // 3초 후에
3 // 4초 후에
1 ~ 10// 즉시 방출
 */