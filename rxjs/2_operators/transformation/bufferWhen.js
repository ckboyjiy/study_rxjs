import {interval} from "rxjs/index";
import { bufferWhen } from 'rxjs/operators';

const ob = interval(300);
const subscription = ob.pipe(
    bufferWhen(() => interval(1000 + Math.random() * 4000))
).subscribe(x => {
    console.log(x);
    if (x.length > 0 && x[x.length-1] > 50) subscription.unsubscribe();
});