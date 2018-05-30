import { ajax } from 'rxjs/ajax';

const txt = ajax('API URL');
txt.subscribe({
    next: res => console.log(res.status, res.response),
    complete: () => console.log('complete')
});
