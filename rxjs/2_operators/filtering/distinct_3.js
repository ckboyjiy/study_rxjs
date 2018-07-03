import { interval } from 'rxjs';
import { distinct, take, map } from 'rxjs/operators';

const ob1 = interval(500).pipe(
    take(20),
    map(v => v % 2)
);
ob1.subscribe(v => console.log('test1', v));
/* Output
test1 0
test2 1   x 10번
 */

ob1.pipe(distinct()).subscribe(v => console.log('test2', v));
/* Output
test2 0
test2 1
 */

const flushTime = interval(2000);
ob1.pipe(distinct(undefined, flushTime)).subscribe(v => console.log('test3', v));
/* Output
test3 0
test3 1 => 2초 동안 중복값 무시 후 Set을 초기화
test3 1
test3 0 => 2초 동안 중복값 무시 후 Set을 초기화
test3 1
test3 0 => 2초 동안 중복값 무시 후 Set을 초기화
test3 1
test3 0 => 2초 동안 중복값 무시 후 Set을 초기화
test3 1
test3 0 => 2초 동안 중복값 무시 후 Set을 초기화
test3 1
 */
