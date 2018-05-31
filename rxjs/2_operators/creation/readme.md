## 생성 연산자 (Creation Operators)

### create
Observable 챕터에서 잠시 사용했던 <code>create</code> 연산자입니다.
<code>create</code> 연산자는 Observable의 정적 연산자로 Observable의 생성자 함수를 호출하여 새로운 차가운 Observable(Cold Observable)을 생성합니다.

ReactiveX의 명세상에는 Creation Operator로 되어 있는데, RxJS에서는 정적 메서드로 구현되어 있습니다.

[Observable의 create 내용 확인하기](../1_observable#create)

### defer
defer 연산자는 Observable의 생성 조차 관찰자(Observer)가 구독을 시작하면 생성합니다.
또한 관찰자가(Observer)가 구독할 때마다 매번 새로운 Observable이 생성됩니다.

```javascript
defer(observableFactory: function(): SubscribableOrPromise): Observable
```
##### 매개변수
* observableFactory : ObservableFactory를 구현하는 함수입니다.
함수 내부에서 원하는 조건에 따라 SubscribableOrPromise 타입을 반환하면 됩니다. (SubscribableOrPromise 타입은 Observable 또는 Promise 객체)

##### 예제 1 (example_1.js)
이 예제는 구독할 때마다 마우스 이벤트 또는 주기적으로 일련번호를 방출하는 Observable 중 하나를 받습니다.
```javascript
import { defer, fromEvent, interval } from 'rxjs';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

const div = document.createElement('div');
const clicksOrInterval = defer(function () {
    let aa = Math.random(); // 랜덤 숫자를 생성합니다.
    if (aa > 0.5) { // 변수 aa의 값에 따라 아래 2가지의 Observable을 생성하고 알림을 발행합니다.
        return fromEvent(div, 'click');
    } else {
        return interval(1000);
    }
});
clicksOrInterval.subscribe(x => console.log('Observer1 : ', x)); // MouseEvent or number
clicksOrInterval.subscribe(x => console.log('Observer2 : ', x)); // MouseEvent or number
div.click();
```

### empty, throwError
empty는 방출 항목없이 완료 타입만 방출하는 빈 Observable을 생성합니다.
throwError는 방출 항목없이 에러 타입만 방출하는 빈 observable을 생성합니다.

##### 예제 2 (example_2.js)
다음 예제는 홀수 초일 때만 "of('a', 'b', 'c')" Observable을 방출하고 짝수일 대는 빈 Observable을 방출합니다.
```javascript
import { EMPTY, interval, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const counter = interval(1000);
const result = counter.pipe( // pipe로 연산자를 체이닝합니다.
    mergeMap(x => { x % 2 === 1 ? of('a', 'b', 'c') : EMPTY)
);
result.subscribe(x => console.log(x));
```

##### 예제 3 (example_3.js)
다음 예제는 "of('a', 'b', 'c')" Observable을 방출하다가 13초가 되면 에러를 방출합니다.
```javascript
import { interval, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

interval(1000).pipe(
    mergeMap(x => x === 13 ? throwError('Thirteens are bad') : of('a', 'b', 'c') )
).subscribe(x => console.log(x), e => console.error(e));
```

### from
Observable 챕터에서 학습했던 <code>from</code> 연산자입니다.

[Observable의 from 내용 확인하기](../1_observable#from)

### interval
Observable 챕터에서 학습했던 <code>interval</code> 연산자입니다.

[Observable의 interval 내용 확인하기](../1_observable#interval)

### range
지정된 범위의 일련번호를 차례대로 방출하는 Observable을 생성합니다.
```javascript
range(start: number = 0, count: number = 0, scheduler?: SchedulerLike): Observable<number>
```
##### 매개변수
* start : 시작 숫자
* count : 방출할 횟수
* scheduler : 선택사항, Scheduler 문서에서 다시 확인하도록 하겠습니다.

##### 예제 4 (example_4.js)
다음 예제는 9~ 18까지의 숫자를 방출합니다.
```javascript
import { range } from 'rxjs';

const numbers = range(9, 10);
numbers.subscribe(x => console.log(x));
```

### repeat
원본 Observable을 지정한 숫자만큼 반복하여 방출합니다.
```javascript
repeat<T>(count: number = -1): MonoTypeOperatorFunction<T>
```
##### 매개변수
* count : 반복할 숫자
##### 반환값
* MonoTypeOperatorFunction :

##### 예제 5 (example_5.js)
다음 예제는 단순히 숫자 1을 방출하는 Observable을 3번 반복해서 방출시킵니다.
```javascript
import { of } from 'rxjs';
import { repeat } from 'rxjs/operators';

of('1', '2').pipe(
    repeat(3)
).subscribe(v => console.log(v));
```

### of
매개변수로 전달된 다양한 값을 순차적으로 방출합니다.
결과적으로는 <code>from</code> 연산자와 유사합니다만 자바스크립트의 call 과 apply를 생각하면 좋을 것 같습니다.
```javascript
of(...values, scheduler: Scheduler): Observable
```
##### 매개변수
* values : 방출할 항목의 값들입니다.
* scheduler : 선택사항, Scheduler 문서에서 다시 확인하도록 하겠습니다.

##### 예제 6 (example_6.js)
다음 예제는 of를 이용하여 다양한 항목을 방출합니다.
```javascript
import { of } from 'rxjs';

of(1, 2, 3, 4, 5).subscribe(val => console.log(val));
console.log('## Next example');
of({ name: 'Brian' }, [1, 2, 3], function hello() { // 객체, 배열, 함수 등도 방출할 수 있습니다.
    return 'Hello';
}).subscribe(val => console.log(val));
```

### timer
매개변수로 전달된 <code>initialDelay</code> 초(밀리세컨드) 후에 <code>period</code>마다 일련번호를 방출합니다.
```javascript
timer(initialDelay: number | Date, period?: number, scheduler?: Scheduler): Observable
```
##### 매개변수
* initialDelay : 방출을 지연할 시간을 지정합니다. 단위는 밀리세컨드입니다.
* period : 선택사항, 방출이 시작된 후 period 값 마다 반복해서 일련번호를 방출합니다.
* scheduler : 선택사항, Scheduler 문서에서 다시 확인하도록 하겠습니다.

##### 예제 7 (example_7.js)
```javascript
import { timer } from 'rxjs';

// 1초 후에 하나의 값을 방출합니다.
timer(1000).subscribe(val => console.log(val));
// 1초후에 2초마다 일련번호를 방출합니다.
timer(1000, 2000).subscribe(val => console.log(val));
```

생성 연산자는 여기까지 소개하고 이제 변환 연산자에 대해서 알아 보겠습니다.
