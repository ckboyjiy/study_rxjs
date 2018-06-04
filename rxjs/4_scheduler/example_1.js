import { of, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const ob = of(1,2,3).pipe(
    observeOn(asyncScheduler)
);
const realObserver = {
    next: val => console.log('got value', val),
    error: err => console.error('something wrong occurred: ', err),
    complete: () => console.log('done')
};

console.log('just before subscribe');
ob.subscribe(realObserver);
console.log('just after subscribe');