import { of, combineLatest } from 'rxjs';

const weight = of(70, 72, 76, 79, 75);
var height = of(1.76, 1.77, 1.78);
var bmi = combineLatest(weight, height, (w, h) => w / (h * h));
bmi.subscribe(x => console.log('BMI is ' + x));
/* Output
BMI is 24.212293388429753
BMI is 23.93948099205209
BMI is 23.671253629592222
 */