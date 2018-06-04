import { asyncScheduler, asapScheduler } from 'rxjs';

asyncScheduler.schedule(() => console.log('async'), 1000);
asapScheduler.schedule(() => console.log('asap'), 1000);
/* Output
async
asap
 */