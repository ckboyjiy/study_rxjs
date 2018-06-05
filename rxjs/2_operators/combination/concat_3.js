import { interval, concat } from 'rxjs';
import { take } from 'rxjs/operators';

const timer = interval(1000).pipe(take(2));
// concating the same Observable!
concat(timer, timer).subscribe(
    value => console.log(value),
    err => {},
    () => console.log('...and it is done!')
);
/* Output
0 // 1초 후에
1 // 2초 후에
0 // 3초 후에
1 // 4초 후에
...and it is done! // 위와 동일한 시점에 (4초 후에)
 */