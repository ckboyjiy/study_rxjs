import { interval } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

const source = interval(200).pipe(take(5)); // 0.2초마다 일련번호를 5번 방출합니다.
const result = source.pipe(debounceTime(300)); // 항목이 방출된 후 0.3초 대기 후 방출합니다. 그 전에 새로운 항목이 방출되면 대기 중인 항목은 삭제합니다.
result.subscribe(x => console.log(x));
/* Output
4
 */