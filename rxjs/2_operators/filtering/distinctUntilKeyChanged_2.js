import { of } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

const ob1 = of(
    {name: 'Foo1', age: 4},
    {name: 'Bar', age: 4},
    {name: 'Foo2', age: 3},
    {name: 'Foo3', age: 5}
);
ob1.pipe(distinctUntilKeyChanged('name')).subscribe(v => console.log(v));
/* Output
{ name: 'Foo1', age: 4 }
{ name: 'Bar', age: 4 }
{ name: 'Foo2', age: 3 }
{ name: 'Foo3', age: 5 }
 */
ob1.pipe(distinctUntilKeyChanged('name', (prev, curr) => prev.substring(0, 3) === curr.substring(0, 3))).subscribe(v => console.log(v));
/* Output
{ name: 'Foo1', age: 4 }
{ name: 'Bar', age: 4 }
{ name: 'Foo2', age: 3 }
 */