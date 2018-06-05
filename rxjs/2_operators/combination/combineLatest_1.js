import { timer, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

const firstTimer = timer(0, 1000); // 매 초마다 일련번호를 방출합니다.
const secondTimer = timer(500, 1000); // 0.5초 지난 시점을 시작으로 매 초마다 일련번호를 방출합니다.
const combinedTimers = combineLatest(firstTimer, secondTimer); // 두개의 옵저버블을 결합합니다.
combinedTimers.pipe(take(5)).subscribe(value => console.log(value));
/* Output
[0, 0] // after 0.5s
[1, 0] // after 1s
[1, 1] // after 1.5s
[2, 1] // after 2s
[2, 2] // after 2.5s
 */