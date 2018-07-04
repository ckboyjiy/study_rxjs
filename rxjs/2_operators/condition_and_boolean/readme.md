# 조건 연산자 (Condition and Boolean Operators)
옵저버블 또는 옵저버블에서 방출된 항목을 평가하는 연산자입니다.

## defaultIfEmpty
```javascript
defaultIfEmpty<T, R>(defaultValue: R = null): OperatorFunction<T, T | R>
```
#### 매개변수
* defaultValue : 방출항목이 없이 완료된 경우 기본값으로 방출할 항목

소스 옵저버블에서 항목 방출없이 완료된 경우 <code>defaultValue</code> 항목을 방출합니다.

#### 에제 1 ([defaultIfEmpty.js](./defaultIfEmpty.js))
다음 예제는 방출항목없이 완료된 소스에 기본값을 방출하는 예제입니다.
```javascript
import { EMPTY } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';

var result = EMPTY.pipe(defaultIfEmpty('The value is empty.'));
result.subscribe(x => console.log(x));
/* Output
The value is empty.
 */
```

## **every**
```javascript
every<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): OperatorFunction<T, boolean>
```
#### 매개변수
* predicate : 방출될 항목을 검사할 함수
* thisArg : 선택사항, 콜백 함수

옵저버블의 방출된 항목이 predicate 함수에 의해 모두 충족하는지 여부를 방출합니다.

#### 예제 1 ([every.js](./every.js))
다음은 모든 요소가 6보다 작으면 true, 그렇지 않으면 false를 내보내는 예제입니다.
```javascript
import { of } from 'rxjs';
import { endWith, every } from 'rxjs/operators';

const ob1 = of(1, 2, 3, 4, 5);
ob1.pipe( every(v => v < 6) ).subscribe(b => console.log(b));
/* Output
true
 */
ob1.pipe(
    endWith(6),
    every(v => v < 6)
).subscribe(b => console.log(b));
/* Output
false
 */
```

