# 유틸리티 연산자 (Utility Operators)
옵저버블의 작업을 도와주기 위한 유용한 도구를 제공하는 연산자입니다.

## delay
```javascript
delay<T>(delay: number | Date, scheduler?: SchedulerLike = async): MonoTypeOperatorFunction<T>
```
#### 매개변수
* delay : 지연시킬 시간 또는 특정 날짜
* scheduler : 선택사항, 기본적으로 asyncScheduler방식으로 작동합니다.

주어진 <code>delay</code> 타입에 따라 주어진 시간 초과 또는 주어진 날짜까지 소스 옵저버블에서 항목의 방출을 지연시킵니다.

#### 예제 1 ([delay_1.js](./delay_1.js))
다음은 옵저버블의 항목을 1초 후에 방출하는 예제입니다.
```javascript
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const source = of ('after 1s');
console.log('before subscribe');
source.pipe(
    delay(1000)
).subscribe(x => console.log(x));
console.log('after subscribe');
/* Output
before subscribe
after subscribe
after 1s // 1초 후에 출력
 */
```

## delayWhen
```javascript
delayWhen<T>(delayDurationSelector: (value: T) => Observable<any>, subscriptionDelay?: Observable<any>): MonoTypeOperatorFunction<T>
```
#### 매개변수
* delayDurationSelector : 지연 시킬 시간 또는 날짜를 반환할 옵저버블
* subscriptionDelay : 선택사항,

#### 예제 1 ([delayWhen.js](./delayWhen))
다음은 0~5초 사이의 임의의 초만큼 방출을 지연하는 예제입니다.
```javascript
import { of, interval } from 'rxjs';
import { delayWhen } from 'rxjs/operators';

const source = of('ONE', 'TWO', 'THREE');
const delayedSource = source.pipe(
    delayWhen(() => interval(Math.random() * 5000) )
);
delayedSource.subscribe(x => console.log(x));
```

