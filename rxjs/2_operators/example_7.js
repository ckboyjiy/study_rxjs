import { timer } from 'rxjs';

// 1초 후에 하나의 값을 방출합니다.
timer(1000).subscribe(val => console.log(val));
// 1초후에 2초마다 일련번호를 방출합니다.
timer(1000, 2000).subscribe(val => console.log(val));