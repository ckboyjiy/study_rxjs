import { interval, timer } from 'rxjs';
import { takeUntil, count } from 'rxjs/operators';

const source = timer(2000); // 2초마다 일련번호를 방출하는 옵저버블
const seconds = interval(1000); // 1초마다 일련번호를 방출하는 옵저버블
const secondsBeforeSource = seconds.pipe(takeUntil(source));  // source가 방출되면 seconds를 완료합니다
const result = secondsBeforeSource.pipe(count()); // seconds에 방출된 횟수를 방출합니다.
result.subscribe(x => console.log(x));