import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

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
ob1.pipe(distinctUntilChanged( (prev, curr) => prev.name === curr.name)).subscribe(v => console.log(v));
/* Output
{ name: 'Foo', age: 4 }
{ name: 'Bar', age: 4 }
{ name: 'Foo', age: 3 }
 */