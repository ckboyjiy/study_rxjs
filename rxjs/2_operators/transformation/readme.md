# 변환 연산자 (Transformation Operators)
옵저버블로부터 방출되는 항목을 변환하는 연산자입니다.

## buffer
```javascript
buffer<T>(closingNotifier: Observable<any>): OperatorFunction<T, T[]>
```

매개변수인 <code>closingNotifier</code> 옵저버블이 발생할 때까지 방출할 옵저버블을 버퍼링합니다.

#### 예제 1 ([buffer.js](./buffer.js))
다음 예제는 <code>interval</code> 이벤트를 모았다가 클릭 이벤트가 발생하면 한번에 배열로 방출하는 예제입니다.
```javascript
import { fromEvent, interval } from 'rxjs';
import { buffer } from 'rxjs/operators';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

const div = document.createElement('div');
const clicks = fromEvent(div, 'click');
const repeater = interval(100); // 0.1 초마다 일련번호가 방출됩니다.
const buffered = repeater.pipe(
    buffer(clicks) // 클릭이벤트가 일어날 때까지 repeater에서 발생되는 항목을 버퍼에 저장했다가 한번에 배열로 방출합니다.
);
buffered.subscribe(x => console.log(x));

const clickEvent = setInterval(()=> { // 1초 마다 클릭 이벤트를 생성합니다.
    div.click();
}, 1000);
setTimeout(() => { // 10초가 지나나면 클릭 이벤트를 멈춥니다.
    clearInterval(clickEvent);
}, 10* 1000);
```

## bufferCount
```javascript
bufferCount<T>(bufferSize: number, startBufferEvery: number = null): OperatorFunction<T, T[]>
```
### 매개변수
* bufferSize: 버퍼 최대 사이즈
* startBufferEvery: 새 버퍼를 시작할 간격

방출할 옵저버블의 항목이 <code>bufferSize</code> 개수만큼 쌓일 때까지 버퍼에 저장했다가 방출합니다.

#### 예제 1 ([bufferConnt_1.js](./bufferCount_1.js))
다음은 옵저버블에서 방출되는 항목을 2번 쌓일 때까지 모았다가 2개씩 한번에 방출하는 예제입니다.
```javascript
import { of } from 'rxjs';
import { bufferCount } from 'rxjs/operators';

const numbers = of(1,2,3,4,5,6,7,8,9,10);
numbers.pipe(
    bufferCount(2)
).subscribe(x => console.log(x));
/* Output
[ 1, 2 ]
[ 3, 4 ]
[ 5, 6 ]
[ 7, 8 ]
[ 9, 10 ]
 */
```

#### 예제 2 ([bufferCount_2.js](./bufferCount_2.js))
다음은 <code>startBufferEvery</code>를 지정하여 작동되는 방식을 보여주는 예제입니다.
```javascript
import { of } from 'rxjs';
import { bufferCount } from 'rxjs/operators';

const numbers = of(1,2,3,4,5,6,7,8,9,10);
numbers.pipe(
    bufferCount(3, 2)
).subscribe(x => console.log(x));
/* Output
[ 1, 2, 3 ]
[ 3, 4, 5 ]
[ 5, 6, 7 ]
[ 7, 8, 9 ]
[ 9, 10 ]
 */
 */
```

## bufferTime
```javascript
bufferTime<T>(bufferTimeSpan: number): OperatorFunction<T, T[]>
bufferTime(bufferTimeSpan: number, scheduler?: SchedulerLike): OperatorFunction<T, T[]>
bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, scheduler?: SchedulerLike): OperatorFunction<T, T[]>
bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number, scheduler?: SchedulerLike): OperatorFunction<T, T[]>
```
### 매개변수
 * bufferTimeSpan : 대기할 시간, milliseconds
 * bufferCreationInterval : 새로운 버퍼를 시작할 간격
 * maxBufferSize : 최대 버퍼 사이즈
 * scheduler : 선택옵션, 기본값은 <code>asyncScheduler</code>

옵저버블에서 방출되는 항목을 지정 시간만큼 버퍼에 저장했다가 한번에 방출합니다.

#### 예제 1 ([bufferTime.js](./bufferTime.js))
다음은 옵저버블에서 방출되는 항목을 1초마다 모아서 한번에 방출하는 예제입니다.
```javascript
import { interval } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

const ob = interval(300); // 0.3 초마다 일련번호를 방출하는 옵저버블
const subscription = ob.pipe(
    bufferTime(1000) // 1초마다 쌓인 항목을 방출
).subscribe(x => {
    console.log(x);
    if (x.length > 0 && x[x.length-1] > 20) subscription.unsubscribe(); // 일련번호가 20이 넘으면 구독 종료
});
/* Output
[ 0, 1, 2 ]
[ 3, 4, 5 ]
[ 6, 7, 8 ]
[ 9, 10, 11, 12 ]
[ 13, 14, 15 ]
[ 16, 17, 18 ]
[ 19, 20, 21 ]
 */
```

#### 예제 2
다음은 옵저버블에서 방출되는 항목을 최초 1초동안 모아서 한번에 방출하고 이후 0.5초마다 방출하는 예제입니다.
<code>maxBufferSize</code>의 지정여부에 따라 어떻게 동작하는지 확인해보세요.
```javascript
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
```

## bufferToggle
```javascript
bufferToggle<T, O>(openings: SubscribableOrPromise<O>, closingSelector: (value: O) => SubscribableOrPromise<any>): OperatorFunction<T, T[]>
```
#### 매개변수
* openings : 방출할 시작 시점
* closingSelector : 방출을 종료할 종료 시점

두 매개변수 사이에 방출된 항목만 모아서 방출합니다.

#### 예제 1 ([bufferToggle.js](./bufferToggle.js))
다음은 0.3초 간격으로 방출되는 일련번호를 0.5초에서 0.5초 사이에 방출되는 항목만 모아서 방출하는 예제입니다.
말이 어려운데요. 100밀리세컨드 단위로 표를 그려서 체크하면서 보시면 도움이 될 것 같습니다.
다만 아무래도 모든 interval의 시작시간의 미묘한 차이에서인지 뒤로 갈수록 값이 조금 틀어지는게 보입니다. 제가 잘못 파악한 것인지 정말로 틀어지는 건지 정확하지 않으니 참고 바랍니다.
```javascript
import { interval, EMPTY } from 'rxjs';
import { bufferToggle } from 'rxjs/operators';

const ob = interval(300);
const opening = interval(500);
const subscription = ob.pipe(
    bufferToggle(opening, i => i % 2 ? interval(500) : EMPTY)
).subscribe(x => {
    console.log(x);
    if (x.length > 0 && x[x.length - 1] > 20) subscription.unsubscribe();
});
/* Output
[]
[ 3 ]
[]
[ 6, 7 ]
[]
[ 9, 10 ]
[]
[ 13 ]
[]
[ 16, 17 ]
[]
[ 19, 20 ]
[]
[ 22, 23 ]
 */
```

## bufferWhen
```javascript
bufferWhen<T>(closingSelector: () => Observable<any>): OperatorFunction<T, T[]>
```
### 매개변수
* closingSelector : 방출할 옵저버블의 시작 및 종료 지점을 관리하는 함수

옵저버블을 닫는 팩토리 함수를 사용하여 옵저버블을 열고 닫고 방출하는 시기를 조절합니다.
이것도 말이 어려운데, 연산자명 그대로 방출할 시점을 지정한다고 생각하면 됩니다.
옵저버블이 방출되는 값을 버퍼에 담고 있다가 <code>closingSelector</code> 옵저버블이 방출되면 버퍼에 쌓인 항목을 방출하고, 다음 <code>closingSelector</code>이 방출될 때까지 반복합니다.

#### 예제 1 ([bufferWhen.js](./bufferWhen.js))
다음은 1~5초마다 방출된 항목을 배열로 한번에 방출하는 예제입니다.
```javascript
import {interval} from "rxjs/index";
import { bufferWhen } from 'rxjs/operators';

const ob = interval(300);
const subscription = ob.pipe(
    bufferWhen(() => interval(1000 + Math.random() * 4000))
).subscribe(x => {
    console.log(x);
    if (x.length > 0 && x[x.length-1] > 50) subscription.unsubscribe();
});
```

## concatMap
```javascript
concatMap<T, I, R>(project: (value: T, index: number) => ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, I | R>
```
#### 매개변수
* project :
* resultSelector :

소스 옵저버블에서 방출한 각 항목에 제공하는 함수를 적용하여 항목을 내보내는 옵저버블을 반환합니다.

#### 예제 1 ([concatMap.js](./concatMap.js))
다음은 각 source 이벤트에 대해 동시성없이 직렬화되어 매 초마다 0~3까지 방출하는 예제입니다.
```javascript
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
```

## concatMapTo
```javascript
concatMapTo<T, I, R>(innerObservable: ObservableInput<I>, resultSelector?: (outerValue: T, innerValue: I, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>
```
#### 매개변수
* innerObservable :
* resultSelector :

출력 옵저버블에서 직렬화된 방식으로 여러번 병합되는 동일한 옵저버블에 각 방출값을 투영합니다.
<code>concatMap</code>과 유사하지만 각 값을 항상 동일한 내부 옵저버블에 매핑합니다.

#### 예제 1 ([concatMapTo.js](./concatMapTo.js))
다음은 각 source 이벤트에 대해 동시성없이 직렬화되어 매 초마다 0~3까지 방출하는 예제입니다.
```javascript
import { interval } from 'rxjs';
import { take, concatMapTo } from 'rxjs/operators';

const source = interval(300).pipe(take(3));
const result = source.pipe(
    concatMapTo(interval(1000).pipe(take(4)))
);
result.subscribe(x => console.log(x));
```

