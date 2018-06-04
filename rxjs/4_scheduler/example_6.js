import { queueScheduler } from 'rxjs';

queueScheduler.schedule(() => {
    queueScheduler.schedule(() => console.log('second'));
    console.log('first');
});
/* Output
first
second
 */