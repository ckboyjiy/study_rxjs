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