import { of } from 'rxjs';
import { endWith, every } from 'rxjs/operators';

const ob1 = of(1, 2, 3, 4, 5);
ob1.pipe( every(v => v < 6) ).subscribe(b => console.log(b));
/* Output
true
 */
ob1.pipe(
    endWith(6),
    every(v => v < 6)
).subscribe(b => console.log(b));
/* Output
false
 */