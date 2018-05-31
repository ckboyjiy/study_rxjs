import { ReplaySubject } from 'rxjs';

const subject = new ReplaySubject();
subject.subscribe({
    next: val => console.log('observer1', val),
    error : err => console.log('observer1', err),
    complete: () => console.log('observer1 complete')
});
subject.next(1);
subject.next(2);
subject.subscribe({
    next: val => console.log('observer2', val),
    error : err => console.log('observer2', err),
    complete: () => console.log('observer2 complete')
});
subject.next(3);
subject.complete();
/* Output
observer1 1
observer1 2
observer2 1
observer2 2
observer1 3
observer2 3
observer1 complete
observer2 complete
 */