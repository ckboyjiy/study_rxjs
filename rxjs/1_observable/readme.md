# Observable - 옵저버블
옵저버블(<code>Observable</code>)은 애플리케이션의 게시자와 구독자간의 메시지 전달을 지원합니다.
이벤트 처리, 비동기 프로그래밍 및 다중 값 처리을 처리함에 있어 다른 기술보다 더 좋은 이점을 제공합니다.

#### 옵저버블(<code>Observable</code>)은 선언적입니다.
값을 게시하기 위한 함수를 정의하지만 소비자가 이 값을 구독하기 전까지는 실행되지 않습니다.
소비자가 구독을 시작하면 함수가 완료되거나 소비자가 구독을 취소할 때까지 알림을 보냅니다.

#### 옵저버블(<code>Observable</code>)은 여러 유형의 값을 전달할 수 있습니다.
컨텍스트에 따라 리터럴, 메시지 또는 이벤트의 여러 값을 전달할 수 있습니다.
값을 수신하는 API는 동기적 또는 비동기적 전달 방식에 상관없이 동일하게 작동됩니다.
설정 및 해체 논리(teardown logic)는 모두 옵저버블(<code>Observable</code>)에 의해 처리되므로, 구독하여 값을 처리하거나, 구독완료 후 처리 그리고 구독을 해제하는 것만 신경쓰면 됩니다.

## 기본적인 설명
우리는 구독자(<code>subscriber</code>)함수를 정의하는 옵저버블(<code>Observable</code>)인스턴스를 만들어야 합니다.
위에도 언급했지만 옵저버블(<code>Observable</code>)에 정의한 구독자(<code>subscriber</code>) 함수는 객체를 생성했다고 하여 실행되지 않습니다. 소비자가 옵저버블(<code>Observable</code>)의 subscribe() 메서드를 호출할 때 실행되는 함수입니다.

구독자(<code>subscriber</code>) 함수는 게시할 값 또는 메시지를 얻거나 생성하는 방법을 정의합니다.

옵저버블(<code>Observable</code>) 객체를 실행하여 알림을 수신하려면 <code>subscribe()</code>메서드를 실행하여 Oberver를 받아야 합니다.
옵저버(<code>Observer</code>)란 쉽게 말해 옵저버블(<code>Observable</code>)이 발행한 알림을 수신하는 객체입니다.
<code>subscribe()</code>메서드는 리턴값으로 알림 수신을 중지하기 위한 Subscription 객체를 받습니다.

## 뜨겁고(Hot) 차가운(Cold) Observable
뜨거운(hot) 옵저버블(<code>Observable</code>)은 옵저버블(<code>Observable</code>)이 생성하는 즉시 항목을 방출합니다. 생성 후 구독을 수행하는 옵저버(<code>Observer</code>)는 중간부터 구독을 시작합니다.

차가운(Cold) 옵저버블(<code>Observable</code>)은 옵저버(<code>Observer</code>)가 구독을 수행하기 전까지 기다린 후에 방출합니다.

옵저버블(<code>Observable</code>)은 위 두가지를 선택할 수 있습니다. 추후 이와 관련해서 블로그할 기회가 있을 것 같습니다.

## 옵저버(<code>Observer</code>) 정의하기
옵저버(<code>Observer</code>)는 옵저버블(<code>Observable</code>)로부터 발생된 알림을 수신하는 핸들러 인터페이스 입니다. 즉, 옵저버블(<code>Observable</code>)이 알림을 생산하는 생산자라면 옵저버(<code>Observer</code>)는 그 알림을 소비하는 소비자입니다.
옵저버블(<code>Observable</code>)이 전달할 수 있는 3가지 유형의 알림을 처리하는 콜백 메서드를 정의할 수 있습니다.

알림의 유형은 아래와 같습니다.
* **next** : 필수 구현 항목으로, 매개변수로 전달된 값을 조작하는 콜백입니다.
* **error** : 오류가 전달되었을 경우 처리하는 콜백입니다. 이 유형을 수신하면 옵저버블(<code>Observable</code>)은 중지됩니다.
* **complete** : 모든 실행이 완료되었을 경우 처리하는 콜백입니다. 전달이 지연되서 늦게 수신된 값들은 완료된 후에도 수신되어 처리될 수 있습니다.

옵저버(<code>Observer</code>)를 정의하는 예제는 아래와 같습니다.
```javascript
const myObserver = {
  next: x => console.log('Observer got a next value: ' + x), // function next(x) { console.log('Observer got a next value: ' + x); }
  error: err => console.error('Observer got an error: ' + err), // function error(err) { console.error('Observer got an error: ' + err); }
  complete: () => console.log('Observer got a complete notification'), // function complete() { console.log('Observer got a complete notification'); }
};
```

## 옵저버블(<code>Observable</code>) 구독하기
반복적으로 드리는 말씀이지만 옵저버블(<code>Observable</code>) 인스턴스는 누군가 구독할 때만 알림을 수신하기 시작합니다.
<code>subscribe()</code> 메서드를 호출할 때 옵저버(<code>Observer</code>) 객체를 전달하여 구독해야 합니다.

구독은 아래와 같이 옵저버블(<code>Observable</code>) 인스턴스의 <code>subscribe()</code> 메서드를 호출하면 됩니다.
매개변수로는 옵저버(<code>Observer</code>) 객체를 넘겨주거나 생성해야 합니다.
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
즉, 옵저버블(<code>Observable</code>)로 부터 발행된 데이터를 스트림처럼 참조합니다.

## 옵저버블(<code>Observable</code>) 만들기
오래 걸렸습니다. 드디어 옵저버블(<code>Observable</code>)을 만들어 볼 차례입니다.
옵저버블(<code>Observable</code>)은 생성자 함수뿐만 아니라 다양한 메서드를 통해 생성할 수 있습니다.

먼저 생성자 함수를 이용하여 생성하는 법부터 알아보겠습니다.

> ##### 옵저버블(<code>Observable</code>) import 하기
> 아! 그전에 옵저버블(<code>Observable</code>) 모듈을 추가하는 것이 필요합니다.
CDN 또는 모듈 import를 사용하여 옵저버블(<code>Observable</code>)을 추가해야 합니다.
> <code>import {Observable} from 'rxjs';</code>

> 문법 표현은 일부 타입스크립트 표기법을 따릅니다.

### 생성자를 이용한 옵저버블(<code>Observable</code>) 만들기
```javascript
new Observable(subscriber: Function): Observable
```
new 연산자를 이용하여 생성자 함수를 호출하여 옵저버블(<code>Observable</code>)을 만들 수 있습니다.

##### 매개변수
* subscriber : 옵저버블(<code>Observable</code>)이 처음 구독될 때 호출되는 함수. 이 함수의 매개변수로 observer가 전달되며 observer를 이용하여 구독자에게 <code>next</code>, <code>error</code>, <code>complate</code> 유형을 통지할 수 있습니다.

##### 예제 1 (example_1.js)
아래의 코드는 new 연산자를 이용하여 옵저버블(<code>Observable</code>)을 생성하는 예제입니다.
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
이번에는 이벤트를 발행하는 옵저버블(<code>Observable</code>)을 생성하는 예제를 보겠습니다.
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

### 옵저버블(<code>Observable</code>)을 생성하는 다양한 연산자(Operators)
생성자 함수 외에도 옵저버블(<code>Observable</code>)을 만들 수 있는 다양한 연산자가 존재합니다.

아래의 링크에서 확인하실 수 있습니다.
* [생성 연산자](../2_operators/creation)

### 그 밖에 다양한 creation Operator들이 존재합니다.
사실 RxJS는 짜증날 정도로 여러 함수들이 생기고 사라지거나, 문법이 바뀌며, 모듈 구조까지 개편되고 있습니다.
자신이 사용하는 RxJS 버전에 맞춰서 API를 찾아보면서 옵저버블(<code>Observable</code>)을 학습해야 할 것 같습니다.

### [Operators 챕터로 이동](../2_operators)

### 유용한 사이트
[ReactiveX 사이트](http://reactivex.to)

[RxJs 사이트](http://reactivex.to/rxjs)