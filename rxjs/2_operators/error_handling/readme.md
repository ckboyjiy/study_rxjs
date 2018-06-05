# 오류 처리 연산자 (Error Handling Operators)
오류를 방출한 옵저버블을 복구하는 연산자입니다.

## catchError
```javascript
catchError<T, R>(selector: (err: any, caught: Observable<T>) => ObservableInput<R>): OperatorFunction<T, T | R>
```
#### 매개변수
* selector : 에러를 받아 처리 후 옵저버블을 반환하는 함수

오류를 방출한 옵저버블에 새로운 옵저버블을 반환하거나 오류를 던져서 처리합니다.

#### 예제 1 ([catchError_1.js](./catchError_1.js))
다음은 옵저버블에서 에러가 방출 시 다른 옵저버블로 방출하는 예제입니다.
```javascript
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const ob = of(1, 2, 3, 4, 5); // 배열로 해당 값을 방출하는 옵저버블 생성
ob.pipe(
    map(n => {
        if (n === 4) { // 맵 연산자를 통해 값이 4인 경우 에러를 방출합니다.
            throw 'four!';
        }
        return n;
    }),
    catchError(err => { // 에러가 감지되면 아래의 옵저버븐을 방출합니다.
        return of('하나', '둘', '셋', '넷', '다섯');
    })
).subscribe(x => console.log(x));
```

#### 예제 2 ([catchError_2.js](./catchError_2.js))
다음은 <code>retry</code> 연산자처럼 에러가 발생하면 다시 시도하는 예제입니다.
```javascript
import { of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

const ob = of(1, 2, 3, 4, 5); // 배열로 해당 값을 방출하는 옵저버블 생성
ob.pipe(
    map(n => {
        if (n === 4) { // 맵 연산자를 통해 값이 4인 경우 에러를 방출합니다.
            throw 'four!';
        }
        return n;
    }),
    catchError((err, caught) => caught), // 에러가 발생하면
    take(30) // 다시 시도 합니다.
).subscribe(x => console.log(x));
```

#### 예제 3 ([catchError_3.js](./catchError_3.js))
다음은 에러가 발생하면 새로운 에러를 생성해서 방출하는 예제입니다.
```javascript
import { of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

const ob = of(1, 2, 3, 4, 5); // 배열로 해당 값을 방출하는 옵저버블 생성
ob.pipe(
    map(n => {
        if (n === 4) { // 맵 연산자를 통해 값이 4인 경우 에러를 방출합니다.
            throw 'four!';
        }
        return n;
    }),
    catchError(err => { throw 'error in source. Details: ' + err; }) // 에러가 발생하면 새로운 에러 객체를 반환
).subscribe(
    x => console.log(x),
    err => console.log(err));
```