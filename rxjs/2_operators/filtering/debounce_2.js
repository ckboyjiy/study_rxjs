import { interval, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

const source = interval(1000); // 1초마다 일련번호를 방출합니다.
const debounceSource = source.pipe(
    debounce( val => timer(val * 200)) // 방출될 때마다 0.2초씩 방출 시간을 늘립니다.
).subscribe(val => console.log(`Example Two: ${val}`));
/* Output
Example Two: 0
Example Two: 1
Example Two: 2
Example Two: 3
Example Two: 4
Example Two: 5
// 5초 후에는 디바운스 시간이 방출시간보다 커져 이후 모든 값은 버려집니다.
 */