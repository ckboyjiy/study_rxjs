import { EMPTY } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';

var result = EMPTY.pipe(defaultIfEmpty('The value is empty.'));
result.subscribe(x => console.log(x));
/* Output
The value is empty.
 */