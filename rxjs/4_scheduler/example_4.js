import { asyncScheduler, asapScheduler } from 'rxjs';

asyncScheduler.schedule(() => console.log('async'));
asapScheduler.schedule(() => console.log('asap'));
/* Output
asap
async
 */