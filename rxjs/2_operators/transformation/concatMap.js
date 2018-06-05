import { interval } from 'rxjs';
import { concatMap, take, map } from 'rxjs/operators';

var source = interval(300).pipe(take(4));
var result = source.pipe(
    concatMap(ev => interval(1000).pipe(
        take(4),
        map(v => `${ev} : ${v}`)
    ))
);
result.subscribe(x => console.log(x));
/* Output
// 매초마다 출력
0 : 0
0 : 1
0 : 2
0 : 3
1 : 0
1 : 1
1 : 2
1 : 3
2 : 0
2 : 1
2 : 2
2 : 3
3 : 0
3 : 1
3 : 2
3 : 3
 */