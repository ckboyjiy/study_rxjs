# 결합 연산자 (Combination Operators)
여러개의 옵저버블을 하나의 옵저버블로 생성하기 위한 연산자입니다.

## combineAll
```javascript
combineAll<T, R>(project?: (...values: Array<any>) => R): OperatorFunction<T, R>
```
#### 매개변수
* project : 선택옵션, 어떤 형태로 병합할지 정의할 수 있습니다. 기본적으로 배열 형태를 문자열 형태로 푸는 형태로 출력됩니다.

<code>combineAll</code> 연산자는 방출되는 옵저버블이 완료되면 그 결과를 모아 <code>combineLastest</code>를 사용하여 합칩니다.

#### 예제 1 ([combineAll_1.js](./combineAll_1.js))
다음은 내부 옵저버블에서 방출되는 항목을 하나로 병합하여 방출하는 예제입니다.
```javascript
import { interval } from 'rxjs';
import { combineAll, take, map } from 'rxjs/operators';

const source = interval(1000).pipe(take(2)); // 매 1초마다 일련번호를 방출하는 옵저버블을 2개만 방출합니다.
const example = source.pipe( // 방출된 2개의 옵저버블은
    map(val => interval(1000).pipe( // map 연산자를 통해 일련번호를 방출하는 옵저버블을 생성하여
        map(i => `Result (${val}): ${i}`), // 해당 일련번호를 바탕으로 문자열을 방출하는 옵저버블로 반환됩니다.
        take(5) // 해당 옵저버블은 5개까지만 방출합니다.
    ))
);
const combined = example.pipe(combineAll()); // 방출이 완료되면 combineAll 연산자를 통해 병합합니다.

const subscription = combined.subscribe(val => console.log(val));
```

#### 예제 2 ([combineAll_2.js](./combineAll_2.js))
다음은 위에서 테스트한 코드를 바탕으로 project 매개변수를 추가하여 결과를 어떻게 수정할 수 있는지 확인해보겠습니다.
```javascript
import { interval } from 'rxjs';
import { combineAll, take, map } from 'rxjs/operators';

const source = interval(1000).pipe(take(2));
const example = source.pipe(
    map(val => interval(1000).pipe(
        map(i => `Result (${val}): ${i}`),
        take(5)
    ))
);
const combined = example.pipe(combineAll((...args)=> {
    return [args[1], args[0]]; // 출력되는 순서를 바꿔줍니다.
    /*
    return args; // 기본값은 이런 식으로 배열 자체를 반환합니다.
     */
}));

const subscription = combined.subscribe(val => console.log(val));

```

## combineLatest
```javascript
combineLatest<T, R>(...observables: Array<any | ObservableInput<any> | Array<ObservableInput<any>> | (((...values: Array<any>) => R)) | SchedulerLike>): Observable<R>
// 공식 API에서 정의된 문법은 위와 같습니다만... 가독성이 떨어지기도 하고, project 매개변수의 표시가 명확하지 않습니다. 아래의 문법을 참고하세요.
combineLatest(observables: ...Observable, project?: function, scheduler?: SchedulerLike): Observable
```
#### 매개변수
* observables : 복수개의 옵저버블을 펼침연산자로 받습니다. 하나의 옵저버블로 통합할 대상입니다.
* project : 선택사항, 하나의 옵저버블로 합치는 결과를 수정할 수 있습니다.
* scheduler : 선택사항, 기본값은 스케줄러를 사용하지 않습니다. 비동기 처리를 원하면 원하는 스케줄러를 추가하세요.

각 옵저버블의 마지막 방출항목을 결합하여 하나의 옵저버블을 생성합니다.

#### 예제 1 ([combineLatest_1.js](./combineLatest_1.js))
다음은 두개의 옵저버블을 마지막 방출값을 결합하여 출력하는 예제입니다.
```javascript
import { timer, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

const firstTimer = timer(0, 1000); // 매 초마다 일련번호를 방출합니다.
const secondTimer = timer(500, 1000); // 0.5초 지난 시점을 시작으로 매 초마다 일련번호를 방출합니다.
const combinedTimers = combineLatest(firstTimer, secondTimer); // 두개의 옵저버블을 결합합니다.
combinedTimers.pipe(take(5)).subscribe(value => console.log(value));
/* Output
[0, 0] // after 0.5s
[1, 0] // after 1s
[1, 1] // after 1.5s
[2, 1] // after 2s
[2, 2] // after 2.5s
 */
```

#### 예제 2 ([combineLatest_2.js](./combineLatest_3.js))
다음 예제는 배열을 옵저버블로 변환하여 지연방출하는 예제입니다.
```javascript
import { combineLatest, of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

const observables = [1, 5, 10].map( n => of(n).pipe( // 배열을 옵저버블로 방출합니다.
    delay(n * 1000),
    startWith(0)
)); // 0을 즉시 방출 후 n초 후에 n을 방출합니다.
const combined = combineLatest(observables);
combined.subscribe(value => console.log(value));
/* Output
[ 0, 0, 0 ] // 즉시 방출
[ 1, 0, 0 ] // 1초 후
[ 1, 5, 0 ] // 5초 후
[ 1, 5, 10 ] // 10초 후
 */
```

#### 예제 3 ([combineLatest_3.js](./combineLatest_3.js))
다음 예제는 프로젝트 함수를 이용하여 체질량 지수를 동적으로 계산하는 예제입니다.
```javascript
import { of, combineLatest } from 'rxjs';

const weight = of(70, 72, 76, 79, 75);
var height = of(1.76, 1.77, 1.78);
var bmi = combineLatest(weight, height, (w, h) => w / (h * h));
bmi.subscribe(x => console.log('BMI is ' + x));
/* Output
BMI is 24.212293388429753
BMI is 23.93948099205209
BMI is 23.671253629592222
 */
```

## concat
```javascript
concat<T, R>(...observables: Array<ObservableInput<any>, scheduler?: SchedulerLike): Observable<R>
```
#### 매개변수
* observables : 옵저버블의 배열
* scheduler : 선택사항,

매개변수로 추가된 옵저버블의 순서에 맞춰 순차적으로 방출하는 하나의 옵저버블로 병합합니다.

#### 예제 1 ([concat_1.js](./concat_1.js))
다음은 지연방출되는 옵저버블과 즉시 배열을 방출하는 두개의 옵저버블을 concat을 통해 어떻게 출력되는지 확인하는 예제입니다.
```javascript
import { interval, range, concat } from 'rxjs';
import { take } from 'rxjs/operators';

const timer = interval(1000).pipe(take(4));
const sequence = range(1, 10);
const result = concat(timer, sequence);
result.subscribe(x => console.log(x));
/* Output
0 // 1초 후에
1 // 2초 후에
2 // 3초 후에
3 // 4초 후에
1 ~ 10// 즉시 방출
 */
```

#### 예제 2 ([concat_2.js](./concat_2.js))
다음 예제는 복수의 옵저버블을 파라미터가 아닌 배열로 묶어서 전달했을 때 어떻게 동작하는지 확인하는 예제입니다.
```javascript
import { interval, concat } from 'rxjs';
import { take } from 'rxjs/operators';

const timer1 = interval(1000).pipe(take(10));
const timer2 = interval(2000).pipe(take(6));
const timer3 = interval(500).pipe(take(10));
const result = concat([timer1, timer2, timer3]); // 복수의 매개변수가 아닌 배열로 한번에 전달되었습니다.
let count = 1;
result.subscribe((x, c = count++) => { // 예제 1과 다르게 발행된 시간에 맞춰 순차적으로 전달됩니다.
    x.subscribe(y=> console.log(`timer${c}`, y))
});
/* Output
timer3 0
timer1 0
timer3 1
...
timer2 5
 */
```

#### 예제 3 ([concat_3.js](./concat_3.js))
다음은 같은 옵저버블 두개를 연결하여 두번 반복하는 예제입니다.
```javascript
import { interval, concat } from 'rxjs';
import { take } from 'rxjs/operators';

const timer = interval(1000).pipe(take(2));
// concating the same Observable!
concat(timer, timer).subscribe(
    value => console.log(value),
    err => {},
    () => console.log('...and it is done!')
);
/* Output
0 // 1초 후에
1 // 2초 후에
0 // 3초 후에
1 // 4초 후에
...and it is done! // 위와 동일한 시점에 (4초 후에)
 */
```

## concatAll
```javascript
concatAll<T>(): OperatorFunction<ObservableInput<T>, T>
```
옵저버블 안에 병렬로 방출되는 내부 옵저버블을 직렬화하여 하나의 옵저버블로 방출합니다.

#### 예제 1 ([concatAll.js](./concatAll.js))
다음은 각 이벤트에서 병렬로 방출되는 항목을 동시성없이 순차적으로 방출되는 예제입니다.
```javascript
import { interval } from 'rxjs';
import { concatAll, take, map } from 'rxjs/operators';

const clicks = interval(500).pipe(take(10));// 0,5초 간격으로 일련번호를 방출한다.
const higherOrder = clicks.pipe(
    map(ev => interval(1000).pipe(take(4))) // 0.5초 간격으로 방출된 일련번호를 매초마다 일련번호를 4번 방출하는 옵저버블로 교체한다.
);
const firstOrder = higherOrder.pipe(concatAll()); // 병렬로 수신되지 않고 모든 옵저버블이 직렬화되어 순차적으로 방출된다.
firstOrder.subscribe(x => console.log(x));
/* Output
0
1
2
3 // x 10
 */
```