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
