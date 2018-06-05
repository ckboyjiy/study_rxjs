# 필터링 연산자 (Filtering Operators)
옵저버블로부터 방출되는 항목을 선택적으로 방출하는 연산자입니다.

## audit
```javascript
audit<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>
```
#### 매개변수
* durationSelector: 방출할 항목을 심사할 내부 옵저저블

방출할 옵저버블의 항목은 <code>audit</code> 내부에 호출된 또다른 옵저버블의 수행시간 동안 모두 무시됩니다. 그리고 내부의 옵저버블이 완료되면, 방출한 옵저버블 중 가장 최근 항목 한개만 방출 후 반복합니다.

<code>audit</code>는 나중에 소개할 <code>throttle</code>와 유사하지만 첫 번째 값 대신 마지막 값을 방출하는 차이점이 있습니다.

#### 예제 1 ([audit.js](./audit.js))
다음은 초당 최대 1개의 클릭 이벤트만 방출하는 예제입니다.
```javascript
import { fromEvent, interval } from 'rxjs';
import { audit } from 'rxjs/operators';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

const div = document.createElement('div');
const clicks = fromEvent(div, 'click');
clicks.pipe(
    audit(ev => interval(1000))
/*
 * audit 내부에 interval(1000) 옵저버블을 생성하여 리턴합니다.
 * 이 내부 옵저버블이 수행되는 동안 div로부터 발행된 이벤트는 무시 됩니다.
 * 이 내부 옵저버블이 완료되면 div로부터 발행된 마지막 한개이벤트만 방출됩니다.
 * pipe 구문을 제거 후 비교해보면 좋을 것 같습니다.
 */
).subscribe(x => console.log(x, x.target.getAttribute('counter')));

let divId = 1;
const clickEvent = setInterval(()=> { // 0.1초 마다 클릭 이벤트를 생성합니다.
    div.setAttribute('counter', divId++); // 방출되는 이벤트를 추적하기 위해 counter 속성을 추가합니다.
    div.click();
}, 100);
setTimeout(() => { // 10초가 지나나면 클릭 이벤트를 멈춥니다.
    clearInterval(clickEvent);
}, 10* 1000);
```

## auditTime
```javascript
auditTime<T>(duration: number, scheduler: SchedulerLike = async): MonoTypeOperatorFunction<T>
```
#### 매개변수
* duration: 무시될 옵저버블 방출 기간, 단위는 milliseconds
* scheduler: 선택사항, 기본값은 <code>asyncScheduler</code>

<code>auditTime</code>의 <code>duration</code> 밀리초 동안 방출항목을 무시합니다. 그리고 <code>duration</code> 이후 가장 최근에 방출된 옵저버블 항목 하나를 방출 후 반복합니다.
<code>audit</code>를 시간 검사로 구현했다고 이해하면 될 것 같습니다.

<code>auditTime</code>는 나중에 소개할 <code>throttleTime</code>과 유사하지만 첫 번째 값 대신 마지막 값을 방출하는 차이점이 있습니다.

#### 예제 1 ([auditTime.js](./auditTime.js))
다음은 초당 최대 1개의 클릭 이벤트만 방출하는 예제입니다.
```javascript
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

const div = document.createElement('div');
const clicks = fromEvent(div, 'click');
clicks.pipe(
    auditTime(1000)
).subscribe(x => console.log(x, x.target.getAttribute('counter')));

let divId = 1;
const clickEvent = setInterval(()=> { // 0.1초 마다 클릭 이벤트를 생성합니다.
    div.setAttribute('counter', divId++); // 방출되는 이벤트를 추적하기 위해 counter 속성을 추가합니다.
    div.click();
}, 100);
setTimeout(() => { // 10초가 지나나면 클릭 이벤트를 멈춥니다.
    clearInterval(clickEvent);
}, 10* 1000);
```

## debounce
```javascript
debounce<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>
```
#### 매개변수
* durationSelector : 소스로부터 방출된 항목을 지연시킬 간격을 처리하는 함수

소스에서 방출된 항목을 <code>durationSelector</code>에서 방출되는 항목만큼 지연 후 방출시킵니다.
만약 방출 보류 중 소스에서 다른 항목이 방출되면 기존에 보류중인 항목은 제거됩니다.
이것은 <code>debounceTime</code>와 유사합니다.

#### 예제 1 ([debounce_1.js](./debounce_1.js))
다음은 소스에서 값이 방출된 이후 1초동안 다른 값이 방출이 안된다면 1초 후 그 값을 방출하는 예제입니다.
```javascript
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

var source = of('ONE', 'TWO', 'THREE', 'FOUR');
var result = source.pipe(debounce(() => timer(1000)));
result.subscribe(x => console.log(x));
```

#### 예제 2 ([debounce_2.js](./debounce_2.js))
다음은 매 방출마다 debounce 시간이 증가되는 예제입니다.
```javascript
import { interval, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

const source = interval(1000); // 1초마다 일련번호를 방출합니다.
const debounceSource = source.pipe(
    debounce( val => timer(val * 200)) // 방출될 때마다 0.2초씩 방출 시간을 늘립니다.
).subscribe(val => console.log(`Example Two: ${val}`));
/* Output
Example Two: 0
Example Two: 1
Example Two: 2
Example Two: 3
Example Two: 4
Example Two: 5
// 5초 후에는 디바운스 시간이 방출시간보다 커져 이후 모든 값은 버려집니다.
 */
```

## **debounceTime**
```javascript
debounceTime<T>(dueTime: number, scheduler?: SchedulerLike = async): MonoTypeOperatorFunction<T>
```
#### 매개변수
* dueTime : 방출 지연 간격
* scheduler : 선택사항, 기본값은 asyncScheduler

소스에서 방출되는 항목을 <code>dueTime</code>의 간격 만큼 지연 후 방출합니다.
지연 도중 소스에서 새로운 항목이 방출되면 지연하던 항목은 제거합니다.
가장 자주 사용되는 연산자 중에 하나입니다.

#### 예제 1 ([debounceTime.js](./debounceTime.js))
다음은 0.2초마다 방출되는 일련번호를 5번 반복하는 옵저버블에 0.3초 동안 지연방출하는 예제입니다.
```javascript
import { interval } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

const source = interval(200).pipe(take(5)); // 0.2초마다 일련번호를 5번 방출합니다.
const result = source.pipe(debounceTime(300)); // 항목이 방출된 후 0.3초 대기 후 방출합니다. 그 전에 새로운 항목이 방출되면 대기 중인 항목은 삭제합니다.
result.subscribe(x => console.log(x));
/* Output
4
 */
 ```