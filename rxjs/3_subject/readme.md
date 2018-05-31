# Subject - 서브젝트
서브젝트(<code>Subject</code>)는 옵저버(<code>Observer</code>)나 옵저버블(<code>Observable</code>)처럼 행동하는 Rx의 일부 구현체에서 사용 가능한 일종의 교각 또는 프록시라고 볼 수 있습니다.
즉, 옵저버(<code>Observer</code>)와 옵저버블(<code>Observable</code>)을 모두 상속했다고 이해하시면 됩니다.

서브젝트(<code>Subject</code>)는 옵저버(<code>Observer</code>)처럼 하나 이상의 옵저버블(<code>Observable</code>)을 구독할 수도 있으며, 옵저버블(<code>Observable</code>)이기도 하기 때문에 항목들을 재 방출하거나 새로운 항목들을 방출할 수 있습니다.

하나의 서브젝트(<code>Subject</code>)는 하나의 옵저버블(<code>Observable</code>)을 구독하면서, 옵저버블(<code>Observable</code>) 항목들을 배출시키도록 동작합니다.
이것은 기본적으로 차가운 옵저버블(Cold Observable)이였던 서브젝트(<code>Subject</code>)를 뜨거운 옵저버블(Hot Observable)로 만들기도 합니다.

## 서브젝트(<code>Subject</code>)의 종류
서브젝트(<code>Subject</code>)는 4가지의 종류가 있습니다.

### AsyncSubject
AsyncSubject는 마지막 방출값을 기억하고 있다가 complete()를 호출하면 그 값을 구독자에게 보냅니다. AsyncSubject가 완료되지 않으면 마지막 항목을 제외한 나머지는 무시됩니다.

##### 예제 1 (example_1.js)
다음 예제는 구독자에 방출한 항목 중 <code>complete()</code>이 호출되면 마지막으로 방출한 항목만 구독됩니다.
```javascript
import { AsyncSubject } from 'rxjs';

const subject = new AsyncSubject();
subject.subscribe({ // subject는 Observable을 상속받아 구독할 수 있습니다.
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});

subject.next(1); // subject는 Oserver를 상속받아 항목을 방출할 수 있습니다.
subject.next(2);
subject.next(3);
subject.complete(); // complete를 호출해야 비로소 마지막 항목만 구독자에게 방출됩니다.

```
![AsyncSubject.complete](http://reactivex.io/documentation/operators/images/S.AsyncSubject.png)

##### 예제 2 (example_2.js)
다음 예제는 <code>complete()</code>가 호출되지 않으면 구독자에게 항목을 방출되지 않습니다.
```javascript
import { AsyncSubject } from 'rxjs';

const subject = new AsyncSubject();
subject.subscribe({ // subject는 Observable을 상속받아 구독할 수 있습니다.
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});

subject.next(1); // subject는 Oserver를 상속받아 항목을 방출할 수 있습니다.
subject.next(2);
subject.next(3);
// complete()를 호출하지 않으면 구독자에게 항목이 방출되지 않습니다.
```

##### 예제 3 (example_3.js)
다음 예제는 <code>error()</code>가 호출되면 구독자에게 항목이 방출되지 않고 에러유형만 방출됩니다.
```javascript
import { AsyncSubject } from 'rxjs';

const subject = new AsyncSubject();
subject.subscribe({ // subject는 Observable을 상속받아 구독할 수 있습니다.
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});

subject.next(1); // subject는 Oserver를 상속받아 항목을 방출할 수 있습니다.
subject.next(2);
subject.next(3);
subject.error('error');
// error()가 호출되면 구독자에게 항목이 방출되지 않고 에러유형만 방출됩니다.
```
![AsyncSubject.error](http://reactivex.io/documentation/operators/images/S.AsyncSubject.e.png)

### BehaviorSubject
BehaviorSubject는 옵저버(<code>Observer</code>)가 구독하기 시작하면, 옵저버(<code>Observer</code>)는 옵저버블(<code>Observable</code>)이  최근에 발행한 항목을 발행받습니다. 구독 후 발행된 항목도 계속 발행받습니다.
구독시점에 발행된 항목이 아무것도 없는 경우 undefined를 발행받습니다.

##### 예제 4 (example_4.js)
다음은 옵저버(<code>Observer</code>)가 구독한 시점에 옵저버블(<code>Observable</code>)에서 아무것도 방출하지 않았을 경우 undefined와 함께 이후 방출된 항목을 발행받는 예제입니다.
```javascript
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject();
subject.subscribe({
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});
subject.next(1);
subject.complete();
/* Output
undefined
1
complete
*/
```

##### 예제 5 (example_5.js)
다음은 옵저버(<code>Observer</code>)가 구독하기 전에 옵저버블(<code>Observable</code>)에서 이미 방출된 항목이 있는 경우 구독 시점에 최근에 발행된 항목을 발행 받고, 이후 방출된 항목을 계속 발행받는 예제입니다.
```javascript
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject();
subject.next(1);
subject.subscribe({
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});
subject.next(2);
subject.next(3);
subject.complete();
/* Output
1
2
3
complete
 */
```
![BehaviorSubject.complete](http://reactivex.io/documentation/operators/images/S.BehaviorSubject.png)

##### 예제 6 (example_6.js)
다음은 옵저버블(<code>Observable</code>)에서 에러를 방출한 이후에 옵저버(<code>Observer</code>)가 구독을 시작했을 때 에러 항목 외에 아무것도 발행받지 못하는 예제입니다.
```javascript
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject();
subject.next(1);
subject.next(2);
subject.error('error');
subject.subscribe({
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});
/* Output
error
 */
```
![BehaviorSubject.error](http://reactivex.io/documentation/operators/images/S.BehaviorSubject.e.png)

### PublishSubject (Subject)
Rx에서는 PublishSubject로 명칭된 것이 RxJS에서는 Subject로 구현되어 있습니다.
PublishSubject는 BehaviorSubject와 거의 유사합니다. 다만 한가지는 다릅니다.
바로 구독 전에 발행된 항목을 수신받지 않습니다.

##### 예제 7 (example_7.js)
다음은 옵저버(<code>Observer</code>)가 구독하기 전에 옵저버블(<code>Observable</code>)에서 발행한 항목은 발행받지 못한 채 구독 이후 방출된 항목을 계속 발행받는 예제입니다.
```javascript
import { Subject } from 'rxjs';

const subject = new Subject();
subject.next(1);
subject.subscribe({
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});
subject.next(2);
subject.next(3);
subject.complete();
/* Output
2
3
complete
 */
```
![Subject.complete](http://reactivex.io/documentation/operators/images/S.PublishSubject.png)

##### 예제 8 (example_8.js)
다음은 옵저버블(<code>Observable</code>)에서 에러를 방출한 이후에 옵저버(<code>Observer</code>)가 구독을 시작했을 때 에러 항목 외에 아무것도 발행받지 못하는 예제입니다.
```javascript
import { Subject } from 'rxjs';

const subject = new Subject();
subject.next(1);
subject.next(2);
subject.error('error');
subject.subscribe({
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});
/* Output
error
 */
```
![Subject.error](http://reactivex.io/documentation/operators/images/S.PublishSubject.e.png)

### ReplaySubject
ReplaySubject는 옵저버(<code>Observer</code>)가 구독하는 시기와 관계없이 옵저버블(<code>Observable</code>)에서 방출된 모든 항목을 옵저버(<code>Observer</code>)에게 방출합니다.

##### 예제 9 (example_9.js)
다음은 옵저버블(<code>Observable</code>)을 처음부터 구독하는 Observer1과 중간부터 구독하는 Observer2 모두 발행된 모든 항목을 발행받는 예제입니다.
```javascript
import { ReplaySubject } from 'rxjs';

const subject = new ReplaySubject();
subject.subscribe({
    next: val => console.log('observer1', val),
    error : err => console.log('observer1', err),
    complete: () => console.log('observer1 complete')
});
subject.next(1);
subject.next(2);
subject.subscribe({
    next: val => console.log('observer2', val),
    error : err => console.log('observer2', err),
    complete: () => console.log('observer2 complete')
});
subject.next(3);
subject.complete();
/* Output
observer1 1
observer1 2
observer2 1
observer2 2
observer1 3
observer2 3
observer1 complete
observer2 complete
 */
```
![ReplaySubject](http://reactivex.io/documentation/operators/images/S.ReplaySubject.png)