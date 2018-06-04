import { asyncScheduler } from 'rxjs';

function task(state) {
    console.log(state);
    this.schedule(state + 1, 1000);
}
asyncScheduler.schedule(task, 3000, 0);