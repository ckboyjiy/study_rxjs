# Observable
Observable은 애플리케이션의 게시자와 구독자간의 메시지 전달을 지원합니다.
이벤트 처리, 비동기 프로그래밍 및 다중 값 처리을 처리함에 있어 다른 기술보다 더 좋은 이점을 제공합니다.

#### Observable은 선언적입니다.
값을 게시하기 위한 함수를 정의하지만 소비자가 이 값을 구독하기 전까지는 실행되지 않습니다.
소비자가 구독을 시작하면 함수가 완료되거나 소비자가 구독을 취소할 때까지 알림을 보냅니다.

#### Observable은 여러 유형의 값을 전달할 수 있습니다.
컨텍스트에 따라 리터럴, 메시지 또는 이벤트의 여러 값을 전달할 수 있습니다.
값을 수신하는 API는 동기적 또는 비동기적 전달 방식에 상관없이 동일하게 작동됩니다.
설정 및 해체 논리(teardown logic)는 모두 Observable에 의해 처리되므로, 구독하여 값을 처리하거나, 구독완료 후 처리 그리고 구독을 해제하는 것만 신경쓰면 됩니다.

## 기본적인 설명
우리는 구독자(subscriber)함수를 정의하는 Observable인스턴스를 만들어야 합니다.
위에도 언급했지만 Observable에 정의한 구독자(subscriber) 함수는 객체를 생성했다고 하여 실행되지 않습니다. 소비자가 Observable의 subscribe() 메서드를 호출할 때 실행되는 함수입니다.

구독자(subscriber) 함수는 게시할 값 또는 메시지를 얻거나 생성하는 방법을 정의합니다.

Observable 객체를 실행하여 알림을 수신하려면 <code>subscribe()</code>를 실행하여 Oberver를 받아야 합니다.
Observer란 쉽게 말해 Observable이 발행한 알림을 수신하는 객체입니다.
<sode>subscribe()</code>메서드는 리턴값으로 알림 수신을 중지하기 위한 Subscription 객체를 받습니다.

## Observer 정의하기
Observer는 Observable로부터 발생된 알림을 수신하는 핸들러 인터페이스 입니다.
Observable이 전달할 수 있는 3가지 유형의 알림을 처리하는 콜백 메서드를 정의할 수 있습니다.

유형은 아래와 같습니다.
* **next** : 필수 구현 항목으로, 전달된 각 값을 조작하는 콜백입니다.
* **error** : 오류가 전달되었을 경우 처리하는 콜백입니다. 이 유형을 수신하면 Observable은 중지됩니다.
* **complete** : 모든 실행이 완료되었을 경우 처리하는 콜백입니다. 전달이 지연되서 늦게 수신된 값들은 완료된 후에도 수신되어 처리될 수 있습니다.

Observer를 정의하는 예제는 아래와 같습니다.
```javascript
const myObserver = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
```

## Observable 구독하기
반복적으로 드리는 말씀이지만 Observable 인스턴스는 누군가 구독할 때만 알림을 수신하기 시작합니다.
<code>subscribe()</code> 메서들 실행하고 Observer 객체를 전달하여 구독해야 합니다.

구독은 아래와 같이 Observable 인스턴스의 <code>subscribe()</code> 메서드를 호출하면 됩니다.
매개변수로는 Observer 객체를 넘겨주거나 생성해야 합니다.
```javascript
myObservable.subscribe(myObserver);
or
myObservable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);
```
두 방법 모두 <code>next()</code>함수는 필수이고, <code>error()</code> 및 <code>complate()</code>는 선택적 입니다.

<code>next()</code>함수는 문자열, 이벤트 객체, 숫자 또는 구조체 등 거의 모든 값들을 받을 수 있습니다.
즉, Observable로 부터 발행된 데이터를 스트림처럼 참조합니다.

## Observable 만들기
오래 걸렸습니다. 드디어 Observable을 만들어 볼 차례입니다.
Observable은 생성자 함수뿐만 아니라 다양한 메서드를 통해 생성할 수 있습니다.

먼저 생성자 함수를 이용하여 생성하는 법부터 알아보겠습니다.

> ##### Observable import 하기
> 아! 그전에 Observable 모듈을 추가하는 것이 필요합니다.
CDN 또는 모듈 import를 사용하여 Observable을 추가해야 합니다.
> <code>import {Observable} from 'rxjs';</code>

> 문법 표현은 일부 타입스크립트 표기법을 따릅니다.

### 생성자를 이용한 Observable 만들기
```javascript
new Observable(subscriber: Function): Observable
```
new 키워드를 이용하여 생성자 함수를 호출하여 Observable을 만들 수 있습니다.

##### 매개변수
* subscriber : Observable이 처음 구독될 때 호출되는 함수. 이 함수의 매개변수로 observer가 전달되며 observer를 이용하여 구독자에게 <code>next()</code>, <code>error</code>, <code>complate</code> 유형을 통지할 수 있습니다.

##### 예제 1 (example_1.js)
아래의 코드는 new 연산자를 이용하여 Observable을 생성하는 예제입니다.
```javascript
import { Observable } from 'rxjs';

const subscriber = (observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
    return {unsubscribe() {console.log('unsubscribe');}}
};

const myObservable = new Observable(subscriber); // Observable을 생성합니다.

myObservable.subscribe({
    next(val) { console.log(val);},
    complete() { console.log('complete');}
});
/* output
1
2
3
complete
unsubscribe
*/
```

##### 예제 2 (example_2.js)
이번에는 이벤트를 발행하는 Observable을 생성하는 예제를 보겠습니다.
```javascript
import { Observable } from 'rxjs';
import { JSDOM } from 'jsdom'; // nodejs에서 DOM과 HTML을 사용할 수 있게 해주는 라이브러리입니다.
const { document } = (new JSDOM()).window; // 필요한 document 객체만 변수에 저장합니다.

const btn = document.createElement('button'); // button 엘리먼트를 만듭니다.

function fromEvent(target, eventName) { // 이벤트를 Observable로 수신할 엘리먼트와 수신할 이벤트 이름을 매개변수로 받습니다.
    return new Observable(observer => { // Observable 객체를 반환합니다.
        const handler = (e) => observer.next(e); // 대상 이벤트를 수신하면 Observable에 이벤트를 발행합니다.
        target.addEventListener(eventName, handler); // 대상 엘리먼트에 이벤트를 바인딩합니다.
        return () => {
            target.removeEventListener(eventName); // 작업이 완료되면 이벤트를 언바인딩 합니다.
        }
    })
}

fromEvent(btn, 'click').subscribe({ // 대상 엘리먼트와 이벤트명을 매개변수로 넘긴 후 구독합니다.
    next(e) {console.log(e);} // Observable로 부터 발행된 값(이벤트)을 수신합니다.
})

btn.click(); // 실제 버튼을 클릭합니다.
```
와우! 멋집니다. 다소 이해가 안되는 코드가 있더라도 일단 안심하시고 계속 진행해 보겠습니다.

### Observable을 생성하는 다양한 함수들
생성자 함수 외에도 Observable을 만들 수 있는 다양한 함수들이 존재합니다. 그 중 제가 마음에 드는 몇가지만 소개하도록 하겠습니다.
전부 다 살펴 보기에는 사실 추가, 삭제, 변경되는 함수들이 많아서 생산성이 떨어질 것 같습니다. 관심 있으신 분들은 개인적으로 찾아보도록 합시다.

#### create
```javascript
Observable.create(subscriber: Function): Observable
```
어디서 많이 봤던 구조입니다. 그렇습니다. new 연산자를 통해서 만든 것과 거의 똑같습니다.

예제 1번을 기본으로 create 함수를 써서 바꿔 보겠습니다.
##### 예제 3 (example_3.js)
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
네 뭐라 드릴 말씀이 없습니다. 다음 함수로 넘어가겠습니다.

#### from
```javascript
from(input: ObservableInput, scheduler?: Scheduler]): Observable
```
input으로 다양한 값을 받을 수 있습니다.
ObservableInput이라는 타입은 SubscribableOrPromise 또는 ArrayLike 또는 Iterable을 뜻 합니다.
SubscribableOrPromise이라는 타입은 Subscribable 또는 PromiseLike 또는 ObservableLike 타입을 뜻 합니다.

복잡하게 생각하지 말고 Observable 외에도 Promise와 배열 또는 Iterable 객체들을 넘길 수 있다고 생각하시면 됩니다.

scheduler는 선택사항이며, Scheduler 문서에서 다시 확인하도록 하겠습니다.

아래 예제에서는 Promise, Array, Iterable을 Observable로 바꿔 보겠습니다.
##### 예제 4 (example_4.js)
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

#### interval
```javascript
interval(period: number, scheduler?): Observable<number>
```
지정된 밀리세컨드(period)마다 일련번호(0부터 1씩 증가하는 숫자)를 방출하는 Observable을 만듭니다.

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

### fromEvent
많이 본 함수가 나왔습니다. 예제 2에서 만들었던 함수와 동일합니다.
```javascript
fromEvent(target: EventTargetLike, eventName: string, options?: EventListenerOptions, resultSelector?: ((...args: any[]) => T)): Observable
```
예제 2에서 만든 것과 동일합니다. 다만 뒤에 2가지의 선택적인 매개변수가 있습니다.
options는 내부적으로 target.addEventListener()에 전달되는 옵션값입니다.
resultSelector는 후처리 함수입니다.
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

### ajax
AJAX 요청을 Observable로 만들어 준답니다. 써보진 않았습니다.
```javascript
import { ajax } from 'rxjs/ajax';

const txt = ajax('API URL');
txt.subscribe({
    next: res => console.log(res.status, res.response),
    complete: () => console.log('complete')
});
```

### 그 밖에 다양한 create 함수와 Operator들이 존재합니다.
사실 RxJS는 짜증날 정도로 여러 함수들이 생기고 사라지거나, 문법이 바뀌며, 모듈 구조까지 개편되고 있습니다.
자신이 사용하는 RxJS 버전에 맞춰서 API를 찾아보면서 Observable을 학습해야 할 것 같습니다.

[ReactiveX 사이트](http://reactivex.to)
[RxJs 사이트](http://reactivex.to/rxjs)