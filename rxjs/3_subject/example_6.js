import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject();
subject.next(1);
subject.next(2);
subject.error('error');
subject.subscribe({
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});
/* Output
error
 */