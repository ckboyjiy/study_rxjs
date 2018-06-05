import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

var source = of('ONE', 'TWO', 'THREE', 'FOUR');
var result = source.pipe(debounce(() => timer(1000)));
result.subscribe(x => console.log(x));