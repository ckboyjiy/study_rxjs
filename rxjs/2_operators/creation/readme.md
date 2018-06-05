# 생성 연산자 (Creation Operators)
새로운 옵저버블을 생성하는 연산자입니다.

## create
<code>create</code> 연산자는 옵저버블(<code>Observable</code>)의 정적 연산자로 옵저버블(<code>Observable</code>)의 생성자 함수를 호출하여 새로운 차가운 옵저버블(Cold Observable)을 생성합니다.

ReactiveX의 명세상에는 Creation Operator로 되어 있는데, RxJS에서는 정적 메서드로 구현되어 있습니다.

```javascript
Observable.create(subscriber: Function): Observable
```
어디서 많이 봤던 구조입니다. 그렇습니다. new 연산자를 통해서 만든 것과 똑같습니다.
RxJS에서는 옵저버블(<code>Observable</code>)의 정적 메소드로 정의되어 있습니다.
create 메서드는 내부적으로 옵저버블(<code>Observable</code>)의 생성자 함수를 사용하여 새로운 옵저버블(<code>Observable</code>)을 생성합니다.

### 예제 1 ([create.js](./create.js))
다음은 새로운 옵저버블을 생성하는 예제입니다.
```javascript
import { Observable } from 'rxjs';

const myObservable = Observable.create(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
    return {unsubscribe() {console.log('unsubscribe');}}
});

myObservable.subscribe({
    next(val) { console.log(val);},
    complete() { console.log('complete');}
});
```



## defer
defer 연산자는 옵저버블(<code>Observable</code>)의 생성 조차 옵저버(<code>Observer</code>)가 구독을 시작하면 생성합니다.
또한 옵저버(<code>Observer</code>)가 구독할 때마다 매번 새로운 옵저버블(<code>Observable</code>)이 생성됩니다.

```javascript
defer(observableFactory: function(): SubscribableOrPromise): Observable
```
### 매개변수
* observableFactory : ObservableFactory를 구현하는 함수입니다.
함수 내부에서 원하는 조건에 따라 SubscribableOrPromise 타입을 반환하면 됩니다. (SubscribableOrPromise 타입은 Observable 또는 Promise 객체)

### 예제 1 ([defer.js](./defer.js))
이 예제는 구독할 때마다 마우스 이벤트 또는 주기적으로 일련번호를 방출하는 옵저버블(<code>Observable</code>) 중 하나를 받습니다.
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

## EMPTY, throwError
empty는 방출 항목없이 완료 타입만 방출하는 빈 옵저버블(<code>Observable</code>)을 생성합니다.
throwError는 방출 항목없이 에러 타입만 방출하는 빈 observable을 생성합니다.

### 예제 1 ([EMPTY.js](./EMPTY.js))
다음 예제는 홀수 초일 때만 "of('a', 'b', 'c')" 옵저버블(<code>Observable</code>)을 방출하고 짝수일 대는 빈 옵저버블(<code>Observable</code>)을 방출합니다.
```javascript
import { EMPTY, interval, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const counter = interval(1000);
const result = counter.pipe( // pipe로 연산자를 체이닝합니다.
    mergeMap(x => { x % 2 === 1 ? of('a', 'b', 'c') : EMPTY)
);
result.subscribe(x => console.log(x));
```

#### 예제 2 ([throwError.js](./throwError.js))
다음 예제는 "of('a', 'b', 'c')" 옵저버블(<code>Observable</code>)을 방출하다가 13초가 되면 에러를 방출합니다.
```javascript
import { interval, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

interval(1000).pipe(
    mergeMap(x => x === 13 ? throwError('Thirteens are bad') : of('a', 'b', 'c') )
).subscribe(x => console.log(x), e => console.error(e));
```

## from
```javascript
from(input: ObservableInput, scheduler?: Scheduler]): Observable
```
input으로 다양한 값을 받을 수 있습니다.
ObservableInput이라는 타입은 SubscribableOrPromise 또는 ArrayLike 또는 Iterable을 뜻 합니다.
SubscribableOrPromise이라는 타입은 Subscribable 또는 PromiseLike 또는 ObservableLike 타입을 뜻 합니다.

복잡하게 생각하지 말고 옵저버블(<code>Observable</code>) 외에도 Promise와 배열 또는 Iterable 객체들을 넘길 수 있다고 생각하시면 됩니다.

scheduler는 선택사항이며, Scheduler 문서에서 다시 확인하도록 하겠습니다.

아래 예제에서는 Promise, Array, Iterable을 옵저버블(<code>Observable</code>)로 바꿔 보겠습니다.
#### 예제 1 ([from.js](./from.js))
```javascript
import { from } from 'rxjs';

// Promise를 Observable로
const promise = new Promise(resolve => resolve('I\'m a promise'));

const observable1 = from(promise);
observable1.subscribe({
    next(val) {
        console.log('observable1', val)
    },
    complete() {
        console.log('observable1 complete');
    }
});

// Array를 Observable로
const array = [1, 2, 3];
const observable2 = from(array);
observable2.subscribe({
    next(val) {
        console.log('observable2', val)
    },
    complete() {
        console.log('observable2 complete');
    }
});

// Iterable을 Observable로
const iter = 'Hello World';
const observable3 = from(iter);
observable3.subscribe({
    next(val) {
        console.log('observable3', val)
    },
    complete() {
        console.log('observable3 complete');
    }
})
```

## fromEvent
많이 본 함수가 나왔습니다. 옵저버블의 예제 2에서 만들었던 함수와 동일합니다.
```javascript
fromEvent(target: EventTargetLike, eventName: string, options?: EventListenerOptions, resultSelector?: ((...args: any[]) => T)): Observable
```
#### 매개변수
* target : 이벤트를 트리거할 엘리먼트
* eventName : 트리거할 이벤트
* options : 선택사항, 내부적으로 target.addEventListener()에 전달되는 옵션값입니다.
* resultSelector : 선택사항, 후처리 함수입니다.

지정한 엘리먼트로부터 수신된 이벤트를 옵저버블로 발행합니다.

#### 예제 1 ([fromEvent.js](./fromEvent.js))
```javascript
import { fromEvent } from 'rxjs';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

// 예제 2와 동일한 코드 구성입니다.
const btn = document.createElement('button'); // button 엘리먼트를 만듭니다.
fromEvent(btn, 'click').subscribe({ // 대상 엘리먼트와 이벤트명을 매개변수로 넘긴 후 구독합니다.
    next(e) {console.log(e);} // Observable로 부터 발행된 값(이벤트)을 수신합니다.
})
btn.click(); // 실제 버튼을 클릭합니다.
```

## interval
```javascript
interval(period: number, scheduler?): Observable<number>
```
#### 매개변수
* period : 일련번호를 발행할 간격 (밀리세컨드)

지정된 밀리세컨드(period)마다 일련번호(0부터 1씩 증가하는 숫자)를 방출하는 옵저버블(<code>Observable</code>)을 만듭니다.

#### 예제 1 ([interval.js](./interval.js))
```javascript
import { interval } from 'rxjs';

const counter = interval(1000); // 지정된 밀리세컨드마다 카운트를 Observable로 방출합니다.
const subscription = counter.subscribe({
    next: val => {
        console.log(val);
        if (val >= 10) { // 계속 반복하므로 10번 카운팅되면 구독을 중지합니다.
            subscription.unsubscribe();
        }
    },
    complete: () => console.log('complete') // 무한반복이므로 완료 유형은 호출되지 않습니다.
});
```

## range
지정된 범위의 일련번호를 차례대로 방출하는 옵저버블(<code>Observable</code>)을 생성합니다.
```javascript
range(start: number = 0, count: number = 0, scheduler?: SchedulerLike): Observable<number>
```
#### 매개변수
* start : 시작 숫자
* count : 방출할 횟수
* scheduler : 선택사항, Scheduler 문서에서 다시 확인하도록 하겠습니다.

#### 예제 1 ([range.js](./range.js))
다음 예제는 9~ 18까지의 숫자를 방출합니다.
```javascript
import { range } from 'rxjs';

const numbers = range(9, 10);
numbers.subscribe(x => console.log(x));
```

## repeat
원본 옵저버블(<code>Observable</code>)을 지정한 숫자만큼 반복하여 방출합니다.
```javascript
repeat<T>(count: number = -1): MonoTypeOperatorFunction<T>
```
#### 매개변수
* count : 반복할 숫자
#### 반환값
* MonoTypeOperatorFunction :

#### 예제 1 ([repeat.js](./repeat.js))
다음 예제는 단순히 숫자 1을 방출하는 옵저버블(<code>Observable</code>)을 3번 반복해서 방출시킵니다.
```javascript
import { of } from 'rxjs';
import { repeat } from 'rxjs/operators';

of('1', '2').pipe(
    repeat(3)
).subscribe(v => console.log(v));
```

## of
매개변수로 전달된 다양한 값을 순차적으로 방출합니다.
결과적으로는 <code>from</code> 연산자와 유사합니다만 자바스크립트의 call 과 apply를 생각하면 좋을 것 같습니다.
```javascript
of(...values, scheduler: Scheduler): Observable
```
#### 매개변수
* values : 방출할 항목의 값들입니다.
* scheduler : 선택사항, Scheduler 문서에서 다시 확인하도록 하겠습니다.

#### 예제 1 ([of.js](./of.js))
다음 예제는 of를 이용하여 다양한 항목을 방출합니다.
```javascript
import { of } from 'rxjs';

of(1, 2, 3, 4, 5).subscribe(val => console.log(val));
console.log('## Next example');
of({ name: 'Brian' }, [1, 2, 3], function hello() { // 객체, 배열, 함수 등도 방출할 수 있습니다.
    return 'Hello';
}).subscribe(val => console.log(val));
```

## timer
매개변수로 전달된 <code>initialDelay</code> 초(밀리세컨드) 후에 <code>period</code>마다 일련번호를 방출합니다.
```javascript
timer(initialDelay: number | Date, period?: number, scheduler?: Scheduler): Observable
```
#### 매개변수
* initialDelay : 방출을 지연할 시간을 지정합니다. 단위는 밀리세컨드입니다.
* period : 선택사항, 방출이 시작된 후 period 값 마다 반복해서 일련번호를 방출합니다.
* scheduler : 선택사항, Scheduler 문서에서 다시 확인하도록 하겠습니다.

#### 예제 1 ([timer.js](./timer.js))
```javascript
import { timer } from 'rxjs';

// 1초 후에 하나의 값을 방출합니다.
timer(1000).subscribe(val => console.log(val));
// 1초후에 2초마다 일련번호를 방출합니다.
timer(1000, 2000).subscribe(val => console.log(val));
```

