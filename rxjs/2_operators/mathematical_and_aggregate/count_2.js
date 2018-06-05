import { range } from 'rxjs';
import { count } from 'rxjs/operators';

var numbers = range(1, 7);
var result = numbers.pipe(count(i => i % 2 === 1));
result.subscribe(x => console.log(x));
/* Output
4
 */