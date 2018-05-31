import { AsyncSubject } from 'rxjs';

const subject = new AsyncSubject();
subject.subscribe({ // subject는 Observable을 상속받아 구독할 수 있습니다.
    next: val => console.log(val),
    error: error => console.log(error),
    complete: () => console.log('complete')
});

subject.next(1); // subject는 Oserver를 상속받아 항목을 방출할 수 있습니다.
subject.next(2);
subject.next(3);
// complete()를 호출하지 않으면 구독자에게 항목이 방출되지 않습니다.