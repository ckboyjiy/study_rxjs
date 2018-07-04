import { of, interval } from 'rxjs';
import { map, exhaustMap, take } from 'rxjs/operators';

const ob1 = of('A', 'B').pipe(
    exhaustMap(v => interval(1000).pipe(
        take(5),
        map(vv => `${v}${vv}`)
        )
    )
);

ob1.subscribe(v => console.log('exhaustMap', v));
/* Output
exhaust A0
exhaust A1
exhaust A2
exhaust A3
exhaust A4
 */