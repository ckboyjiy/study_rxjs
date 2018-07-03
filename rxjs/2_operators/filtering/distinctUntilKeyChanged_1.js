import { of } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

const ob1 = of(
    {name: 'Foo', age: 4},
    {name: 'Bar', age: 4},
    {name: 'Foo', age: 3},
    {name: 'Foo', age: 5}
);
ob1.subscribe(v => console.log(v));
/* Output
{ name: 'Foo', age: 4 }
{ name: 'Bar', age: 4 }
{ name: 'Foo', age: 3 }
{ name: 'Foo', age: 5 }
 */
ob1.pipe(distinctUntilKeyChanged('name')).subscribe(v => console.log(v));
/* Output
{ name: 'Foo', age: 4 }
{ name: 'Bar', age: 4 }
{ name: 'Foo', age: 3 }
 */