import { interval, concat } from 'rxjs';
import { take } from 'rxjs/operators';

const timer1 = interval(1000).pipe(take(10));
const timer2 = interval(2000).pipe(take(6));
const timer3 = interval(500).pipe(take(10));
const result = concat([timer1, timer2, timer3]); // 복수의 매개변수가 아닌 배열로 한번에 전달되었습니다.
let count = 1;
result.subscribe((x, c = count++) => { // 예제 1과 다르게 발행된 시간에 맞춰 순차적으로 전달됩니다.
    x.subscribe(y=> console.log(`timer${c}`, y))
});
/* Output
timer3 0
timer1 0
timer3 1
timer3 2
timer2 0
timer1 1
timer3 3
timer3 4
timer1 2
timer3 5
timer3 6
timer2 1
timer1 3
timer3 7
timer3 8
timer1 4
timer3 9
timer2 2
timer1 5
timer1 6
timer2 3
timer1 7
timer1 8
timer2 4
timer1 9
timer2 5
 */