# 수학과 집계 연산자 (Mathematical and Aggregate Operators)
옵저버블에서 방출된 전체 항목을 대상으로 작동하는 연산자입니다.

## count
```javascript
count<T>(predicate?: (value: T, index: number, source: Observable<T>) => boolean): OperatorFunction<T, number>
```
#### 매개변수
* predicate : 선택사항, 방출된 항목의 카운팅 여부를 계산하여 boolean값을 반환하는 함수입니다. false를 반환하면 카운팅에서 제외됩니다.

소스의 방출 횟수를 계산하고 소스가 완료되면 해당 수치를 방출합니다.

#### 예제 1 ([count_1.js](./count_1.js))
다음은 소스에서 이벤트가 방출되기까지 걸린 시간을 계산하는 예제입니다.
약간의 시간차가 발생되는 것 같습니다.
```javascript
import { interval, timer } from 'rxjs';
import { takeUntil, count } from 'rxjs/operators';

const source = timer(2000); // 2초마다 일련번호를 방출하는 옵저버블
const seconds = interval(1000); // 1초마다 일련번호를 방출하는 옵저버블
const secondsBeforeSource = seconds.pipe(takeUntil(source));  // source가 방출되면 seconds를 완료합니다
const result = secondsBeforeSource.pipe(count()); // seconds에 방출된 횟수를 방출합니다.
result.subscribe(x => console.log(x));
```

#### 예제 2 ([count_2.js](./count_2.js))
다음은 1부터 7사이에 홀수가 몇개인지 계산하는 예제입니다.
```javascript
import { range } from 'rxjs';
import { count } from 'rxjs/operators';

var numbers = range(1, 7);
var result = numbers.pipe(count(i => i % 2 === 1));
result.subscribe(x => console.log(x));
/* Output
4
 */
```

