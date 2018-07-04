import { of } from 'rxjs';
import { elementAt } from 'rxjs/operators';

of(1, 2, 3).pipe(elementAt(2)).subscribe(n => console.log(n));
/* Output
3
 */
of(1, 2, 3).pipe(elementAt(3)).subscribe(n => console.log(n), err => console.log('에러'));
/* Output
에러
 */
of(1, 2, 3).pipe(elementAt(3, 0)).subscribe(n => console.log(n));
/* Output
0
 */