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

