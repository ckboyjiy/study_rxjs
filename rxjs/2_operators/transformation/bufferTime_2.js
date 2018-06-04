import { interval } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

const ob = interval(300); // 0.3 초마다 일련번호를 방출하는 옵저버블
const subscription = ob.pipe(
    bufferTime(1000, 500) // 최초 1초까지의 쌓인 항목을 방출하고, 이후 0.5초마다 추가 항목을 방출합니다
).subscribe(x => {
    console.log(x);
    if (x.length > 0 && x[x.length-1] > 20) subscription.unsubscribe(); // 일련번호가 20이 넘으면 구독 종료
});
/* Output
[ 0, 1, 2 ]
[ 1, 2, 3 ]
[ 3, 4, 5 ]
[ 4, 5, 6, 7 ]
[ 6, 7, 8 ]
[ 8, 9, 10 ]
[ 9, 10, 11, 12 ]
[ 11, 12, 13 ]
[ 13, 14, 15 ]
[ 14, 15, 16 ]
[ 16, 17, 18 ]
[ 17, 18, 19, 20 ]
[ 19, 20, 21 ]
 */