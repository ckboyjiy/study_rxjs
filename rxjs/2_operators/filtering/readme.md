# 필터링 연산자 (Filtering Operators)
옵저버블로부터 방출되는 항목을 선택적으로 방출하는 연산자입니다.

## audit
```javascript
audit<T>(durationSelector: (value: T) => SubscribableOrPromise<any>): MonoTypeOperatorFunction<T>
```
### 매개변수
* durationSelector: 방출할 항목을 심사할 내부 옵저저블

방출할 옵저버블의 항목은 <code>audit</code> 내부에 호출된 또다른 옵저버블의 수행시간 동안 모두 무시됩니다. 그리고 내부의 옵저버블이 완료되면, 방출한 옵저버블 중 가장 최근 항목 한개만 방출 후 반복합니다.

<code>audit</code>는 나중에 소개할 <code>throttle</code>와 유사하지만 첫 번째 값 대신 마지막 값을 방출하는 차이점이 있습니다.

### 예제 1 ([audit.js](./audit.js))
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
### 매개변수
* duration: 무시될 옵저버블 방출 기간, 단위는 milliseconds
* scheduler: 선택사항, 기본값은 <code>asyncScheduler</code>

<code>auditTime</code>의 <code>duration</code> 밀리초 동안 방출항목을 무시합니다. 그리고 <code>duration</code> 이후 가장 최근에 방출된 옵저버블 항목 하나를 방출 후 반복합니다.
<code>audit</code>를 시간 검사로 구현했다고 이해하면 될 것 같습니다.

<code>auditTime</code>는 나중에 소개할 <code>throttleTime</code>과 유사하지만 첫 번째 값 대신 마지막 값을 방출하는 차이점이 있습니다.

### 예제 2 ([auditTime.js](./auditTime.js))
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
