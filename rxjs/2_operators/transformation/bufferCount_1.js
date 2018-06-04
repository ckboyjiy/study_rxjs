import { of } from 'rxjs';
import { bufferCount } from 'rxjs/operators';

const numbers = of(1,2,3,4,5,6,7,8,9,10);
numbers.pipe(
    bufferCount(2)
).subscribe(x => console.log(x));
/* Output
[ 1, 2 ]
[ 3, 4 ]
[ 5, 6 ]
[ 7, 8 ]
[ 9, 10 ]
 */