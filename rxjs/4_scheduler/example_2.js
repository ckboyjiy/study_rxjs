import { asyncScheduler } from 'rxjs';

const task = () => console.log('it works!');
asyncScheduler.schedule(task, 2000);