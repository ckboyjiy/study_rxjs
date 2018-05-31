import { of, from } from 'rxjs';
import { repeat } from 'rxjs/operators';

of('1', '2').pipe(
    repeat(3)
).subscribe(v => console.log(v));