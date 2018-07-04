import { of } from 'rxjs';
import { endWith } from 'rxjs/operators';

of('하나', '둘', '셋').pipe(endWith('넷')).subscribe(n => console.log(n));
/* Output
하나
둘
셋
넷
 */