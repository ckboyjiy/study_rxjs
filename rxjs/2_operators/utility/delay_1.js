import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const source = of ('after 1s');
console.log('before subscribe');
source.pipe(
    delay(1000)
).subscribe(x => console.log(x));
console.log('after subscribe');
/* Output
before subscribe
after subscribe
after 1s // 1초 후에 출력
 */