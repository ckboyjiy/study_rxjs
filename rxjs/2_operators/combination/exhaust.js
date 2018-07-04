import { of, interval } from 'rxjs';
import { map, exhaust, take } from 'rxjs/operators';

const ob1 = of('A', 'B').pipe(
    map(v => interval(1000).pipe(
        take(5),
        map(vv => `${v}${vv}`)
        )
    )
);

ob1.pipe(exhaust()).subscribe(v => console.log('exhaust', v));
/* Output
exhaust A0
exhaust A1
exhaust A2
exhaust A3
exhaust A4
 */