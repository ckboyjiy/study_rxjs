import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1).pipe(
    distinctUntilChanged(),
).subscribe(x => console.log(x));
/* Output
1
2
1
2
3
4
3
2
1
 */