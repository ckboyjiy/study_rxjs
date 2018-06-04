import { queueScheduler } from 'rxjs';

queueScheduler.schedule(function(state) {
   if (state !== 0) {
        console.log('before', state);
        this.schedule(state - 1); // `this` references currently executing Action,
                                  // which we reschedule with new state
        console.log('after', state);
    }
}, 0, 3);
/*
before 3
after 3
before 2
after 2
before 1
after 1
 */