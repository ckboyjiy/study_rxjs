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
subject.error('error');
// error()가 호출되면 구독자에게 항목이 방출되지 않고 에러유형만 방출됩니다.