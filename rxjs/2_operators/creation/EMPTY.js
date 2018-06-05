import { EMPTY, interval, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const counter = interval(1000);
const result = counter.pipe( // pipe로 연산자를 체이닝합니다.
    mergeMap(x => {
        console.log('mergeMap');
        return x % 2 === 1 ? of('a', 'b', 'c') : EMPTY // 짝수홀수에 따라 빈 Observable을 방출하거나 다른 Observable을 방출합니다.
    } )
);
result.subscribe(x => console.log(x));