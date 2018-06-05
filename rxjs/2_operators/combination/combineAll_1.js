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
