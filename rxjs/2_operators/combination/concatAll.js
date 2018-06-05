import { interval } from 'rxjs';
import { concatAll, take, map } from 'rxjs/operators';

const clicks = interval(500).pipe(take(10));// 0,5초 간격으로 일련번호를 방출한다.
const higherOrder = clicks.pipe(
    map(ev => interval(1000).pipe(take(4))) // 0.5초 간격으로 방출된 일련번호를 매초마다 일련번호를 4번 방출하는 옵저버블로 교체한다.
);
const firstOrder = higherOrder.pipe(concatAll()); // 병렬로 수신되지 않고 모든 옵저버블이 직렬화되어 순차적으로 방출된다.
firstOrder.subscribe(x => console.log(x));
/* Output
0
1
2
3 // x 10
 */