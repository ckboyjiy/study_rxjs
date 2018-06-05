import { range } from 'rxjs';

const numbers = range(9, 10);
numbers.subscribe(x => console.log(x));