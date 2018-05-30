import { Observable } from 'rxjs';

const subscriber = (observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
    return {unsubscribe() {console.log('unsubscribe');}}
};

const myObservable = new Observable(subscriber);

myObservable.subscribe({
    next(val) { console.log(val);},
    complete() { console.log('complete');}
});