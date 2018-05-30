import { from } from 'rxjs';

// Promise를 Observable로
const promise = new Promise(resolve => resolve('I\'m a promise'));

const observable1 = from(promise);
observable1.subscribe({
    next(val) {
        console.log('observable1', val)
    },
    complete() {
        console.log('observable1 complete');
    }
});

// Array를 Observable로
const array = [1, 2, 3];
const observable2 = from(array);
observable2.subscribe({
    next(val) {
        console.log('observable2', val)
    },
    complete() {
        console.log('observable2 complete');
    }
});

// iterable을 Observable로
const iter = 'Hello World';
const observable3 = from(iter);
observable3.subscribe({
    next(val) {
        console.log('observable3', val)
    },
    complete() {
        console.log('observable3 complete');
    }
})