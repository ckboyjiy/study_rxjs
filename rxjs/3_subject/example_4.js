import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject();
subject.subscribe({
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});
subject.next(1);
subject.complete();