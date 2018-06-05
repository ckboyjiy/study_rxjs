import { of } from 'rxjs';

of(1, 2, 3, 4, 5).subscribe(val => console.log(val));
console.log('## Next example');
of({ name: 'Brian' }, [1, 2, 3], function hello() {
    return 'Hello';
}).subscribe(val => console.log(val));