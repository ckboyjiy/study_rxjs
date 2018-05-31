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
subject.complete(); // complete를 호출해야 비로소 마지막 항목만 구독자에게 방출됩니다.
