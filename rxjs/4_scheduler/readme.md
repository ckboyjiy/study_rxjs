# 스케줄러 - Scheduler
Rx의 스케줄러는 Observable 연산차 체인에 멀티 스레딩을 적용하고 싶을 때 사용하는 기능입니다.
하지만 RxJS에서는 다른 언어에서 제공하는 스케줄러와 다른 방식으로 작동합니다.

## 자바스크립트의 스케줄러
자바스크립트에서의 스케줄러는 멀티 쓰레드 지원이 아닌 타이밍 전략을 통제하는 것 뿐입니다.
이는 자바스크립트의 특성에 따른 것 입니다.

백엔드에서 사용되는 Rx언어들은 스케줄러 작업은 매우 중요한 역할을 합니다. 복잡하고 무거운 작업은 스레드 풀이나 전용 스레드에서 작업을 하고 최종적으로 UI 스레드에 발행하여 UI를 업데이트하는 형식입니다.
프론트엔드에서 많이 사용하는 RxJS는 대부분 스케줄러의 유형에 대해서 걱정할 필요가 거의 없습니다. 일단 자바스크립트는 단일 스레드이기 때문입니다. 스케줄러에 대한 많은 옵션도 없을 뿐더러 보통 기본 스케줄러가 가장 좋은 선택이 될 수 있습니다.

> ## 비동기 자바스크립트
> 다른 언어로 구현된 Rx 스케줄러와의 차이를 이해하려면 먼저 자바스크립트가 런타임 시 어떻게 작동되는지 알아야 합니다.
핵심은 자바스크립트는 단일 스레드이며 비동기 작업을 처리할 때는 콜 스택, 이벤트 루프, 큐 그리고 브라우저에서 제공하는 WEB API의 합작품으로 구현됩니다.
>
>아래의 링크를 통해 개인적인 학습이 필요합니다.
>
> [Philip Roberts의 이벤트 루프 소개 동영상](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
>
> [그 외 검색서비스에서 검색해보기](https://www.google.co.kr/search?q=자바스크립트+비동기&oq=자바스크립트+비동기)

스케줄러는 구독이 시작될 때와 알림이 배달될 때를 제어하는 역할을 합니다.

RxJS에선 스케줄러를 세 가지의 컴포넌트로 되어 있다고 표현합니다.
* **자료구조** : 작업의 우선순위와 기타 기준에 따라 대기열에 넣는 방법을 제공합니다.
* **실행 컨텍스트** : 작업이 실행되는 위치와 시점을 나타냅니다.
* **가상의 시간** : 스케줄러 getter 메소드인 <code>now()</code>에 의해 가상의 시간을 제공합니다. 이는 특정 시간에만 작업이 발행되도록 합니다.

스케줄러를 사용하면 Observable이 Observer에게 어떤 실행 컨텍스트로 알림을 전달할지 정의할 수 있습니다.

##### 예제 1 (example_1.js)
아래의 예제는 일반적인 Observable을 <code>observeOn()</code> 연산자를 사용하여 비동기 스케줄러를 통해 항목을 발행합니다.
```javascript
import { of, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const ob = of(1,2,3).pipe(
    observeOn(asyncScheduler)
);
const realObserver = {
    next: val => console.log('got value', val),
    error: err => console.error('something wrong occurred: ', err),
    complete: () => console.log('done')
};

console.log('just before subscribe');
ob.subscribe(realObserver);
console.log('just after subscribe');
/* Output
just before subscribe
just after subscribe
got value 1
got value 2
got value 3
done
*/
```
결과를 보시면 지금까지 사용했던 결과와는 다른 순서로 나온 것을 보실 수 있습니다.
기본적으로 구독은 동기적으로 작동합니다. 하지만 위 결과는 비동기적으로 작동한 것과 같이 출력이 되었습니다. 이것은 <code>observeOn()</code>에서 전달된 asyncScheduler를 거쳐 항목이 발행되기 때문입니다.

우리가 구현한 Observer의 <code>next()</code>는 내부적으로 아래와 같이 변경됩니다.
```javascript
const proxyObserver = { // realObserver를 한번 감싸 내부적으로 처리한다.
    next: val => {
        asyncScheduler.schedule(
            x => realObserver.next(x),
            0, // 지연시킬 시간
            val // realObserver에 발행할 항목
        );
    },
    ...
}
```
<code>asyncScheduler</code>는 지정한 지연시간에 관계없이 setTimeout 또는 setInterval을 사용하여 작동합니다.

## 스케줄러의 유형
위에서 사용한 <code>asyncScheduler</code>는 RxJS에서 제공하는 내장 스케줄러 중 하나입니다. 그 밖에 유형은 아래와 같습니다.

### AsyncScheduler
> setTimeout(task, duration)을 사용한 것 처럼!
<code>AsyncScheduler</code>는 자바스크립트의 이벤트 큐(task queue)를 이용하여 비동기적으로 작업을 수행합니다.

특정 간격으로 반복하거나 지정시간만큼 지연시키는데 사용하세요!

##### 예제 2 (example_2.js)
다음은 특정 작업을 지연시키는 예제입니다.
```javascript
import { asyncScheduler } from 'rxjs';

const task = () => console.log('it works!');
asyncScheduler.schedule(task, 2000);
```

##### 예제 3 (example_3.js)
다음은 특정 작업을 지정한 간격만큼 반복해서 실행하는 예제입니다. 시작 3호의 지연 후 0을 출력 후 1초마다 +1을 계속 출력합니다.
```javascript
import { asyncScheduler } from 'rxjs';

function task(state) {
    console.log(state);
    this.schedule(state + 1, 1000); // this는 핸져 실행 중인 스케줄러입니다.
}
asyncScheduler.schedule(task, 3000, 0); // 0은 작업에 발행할 항목입니다.
/* Output
0
1
2
...
N
```

### AsapScheduler
> ASAP (As Soon As Possible) - 비동기 작업을 가능한 빨리!!
<code>AsapScheduler</code>는 매개변수로 delay를 지정하면 <code>AsyncScheduler</code>와 동일하게 작동합니다.
하지만 delay가 0이면 현재 동기적으로 작업 중인 코드를 기다린 후 최대한 빨리 실행하려고 합니다.

신속하게 비동기작업을 수행하는데 사용하세요!!

##### 예제 4 (example_4.js)
다음은 asyncScheduler와 asapScheduler를 비교하는 예제입니다.
```javascript
import { asyncScheduler, asapScheduler } from 'rxjs';

asyncScheduler.schedule(() => console.log('async'));
asapScheduler.schedule(() => console.log('asap'));
/* Output
asap
async
 */
```
async가 먼저 작성되었지만 실제로 출력은 asap이 먼저 출력됩니다.

##### 예제 5 (exmaple_5.js)
다음은 asyncScheduler와 asapScheduler를 비교하는 예제입니다. 다만 delay를 1초 지정하였습니다.
```javascript
import { asyncScheduler, asapScheduler } from 'rxjs';

asyncScheduler.schedule(() => console.log('async'), 1000);
asapScheduler.schedule(() => console.log('asap'), 1000);
/* Output
async
asap
 */
```
delay가 지정된다면 asap은 async와 동일하게 작동합니다.

### QueueScheduler
> 반복에 반복에 반복!!
<code>QueueScheduler</code>는 delay가 설정되면 <code>AsyncScheduler</code>와 동일하게 작동합니다.
delay 설정 없이 사용되면 동기적으로 작업을 처리합니다. 스케줄된 작업 내부에서 또 다른 작업이 <code>QueueScheduler</code>에 의해 스케줄링 된다면 처리를 중단되고 내부에 다른 작업이 완료될 대까지 큐에서 대기합니다.
그냥 쉽게 큐 자료구조를 생각하시면 됩니다.

##### 예제 6 (example_6.js)
다음은 QueueScheduler의 스케줄링 순서를 확인하는 예제입니다.
```javascript
import { queueScheduler } from 'rxjs';

queueScheduler.schedule(() => {
    queueScheduler.schedule(() => console.log('second'));
    console.log('first');
});
/* Output
first
second
 */
```

##### 예제 7 (example_7.js)
다음은 재귀적으로 작업을 재스케줄링하는 예제입니다. 즉 재귀적으로 스케줄링 한다는 이야기입니다.
```javascript
import { queueScheduler } from 'rxjs';

queueScheduler.schedule(function(state) {
   if (state !== 0) {
        console.log('before', state);
        this.schedule(state - 1); // `this` references currently executing Action,
                                  // which we reschedule with new state
        console.log('after', state);
    }
}, 0, 3);
/*
before 3
after 3
before 2
after 2
before 1
after 1
*/
```
큐 스케줄러 내부에서 큐 스케줄러가 중첩되서 호출될 경우 처음 큐의 작업이 모두 완료될 때까지 다음 큐들은 동작하지 않습니다.

### AnimationFrameScheduler
> 한편의 애니매이션처럼...
<code>AnimationFrameScheduler</code>는 delay가 설정되면, <code>AsyncScheduler</code>와 동일하게 작동합니다.
delay가 지정되지 않으면, 부드러운 애니메이션을 만드는데 사용될 수 있습니다.
이것은 브라우저의 화면이 갱신되기 바로 전에 예정된 작업을 수행하도록 하여 가능한 한 효율적으로 애니메이션을 수행합니다.

##### 예제 8 (example_8.js)
다음은 div 엘리먼트의 높이에 애니메이션을 적용하는 예제입니다.
> #### 이 예제는 브라우저를 통해서 확인하세요!
> 해당 예제는 webpack과 babel-loader를 이용하여 트랜스파일링 후 html파일에 포함되어 있습니다.
```javascript
