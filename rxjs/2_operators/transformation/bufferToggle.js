import { interval, EMPTY } from 'rxjs';
import { bufferToggle } from 'rxjs/operators';

const ob = interval(300);
const opening = interval(500);
const subscription = ob.pipe(
    bufferToggle(opening, i => i % 2 ? interval(500) : EMPTY)
).subscribe(x => {
    console.log(x);
    if (x.length > 0 && x[x.length - 1] > 20) subscription.unsubscribe();
});
/* Output
[]
[ 3 ]
[]
[ 6, 7 ]
[]
[ 9, 10 ]
[]
[ 13 ]
[]
[ 16, 17 ]
[]
[ 19, 20 ]
[]
[ 22, 23 ]
 */