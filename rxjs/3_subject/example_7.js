import { Subject } from 'rxjs';

const subject = new Subject();
subject.next(1);
subject.subscribe({
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});
subject.next(2);
subject.next(3);
subject.complete();
/* Output
2
3
complete
 */