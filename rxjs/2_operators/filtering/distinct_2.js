import { of } from 'rxjs';
import { distinct } from 'rxjs/operators';

const ob1 = of(
    {name: 'Foo', age: 4},
    {name: 'Bar', age: 4},
    {name: 'Foo', age: 3}
);
ob1.subscribe(v => console.log(v));
/* Output
{ name: 'Foo', age: 4 }
{ name: 'Bar', age: 4 }
{ name: 'Foo', age: 3 }
 */
ob1.pipe(distinct(data => data.name)).subscribe(v => console.log(v));
/* Output
{ name: 'Foo', age: 4 }
{ name: 'Bar', age: 4 }
 */