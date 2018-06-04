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