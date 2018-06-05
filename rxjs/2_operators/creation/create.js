import { Observable } from 'rxjs';

const myObservable = Observable.create(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
    return {unsubscribe() {console.log('unsubscribe');}}
});

myObservable.subscribe({
    next(val) { console.log(val);},
    complete() { console.log('complete');}
});