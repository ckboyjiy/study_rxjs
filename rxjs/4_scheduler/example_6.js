import { queueScheduler } from 'rxjs';

console.log('before schedule');
queueScheduler.schedule(() => {
    queueScheduler.schedule(() => console.log('second'));
    console.log('first');
});
console.log('after schedule');
/* Output
before schedule
first
second
after schedule
 */