import { of } from 'rxjs';
import { delay, expand, take } from 'rxjs/operators';

of(1, 10).pipe(
    expand(x => of(2 * x).pipe(delay(1000))),
    take(10)
).subscribe(v => console.log(v));
/* Output
1
10
2
20
4
40
8
80
16
160
 */