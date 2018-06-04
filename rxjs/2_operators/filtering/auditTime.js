import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

const div = document.createElement('div');
const clicks = fromEvent(div, 'click');
clicks.pipe(
    auditTime(1000)
).subscribe(x => console.log(x, x.target.getAttribute('counter')));

let divId = 1;
const clickEvent = setInterval(()=> { // 0.1초 마다 클릭 이벤트를 생성합니다.
    div.setAttribute('counter', divId++); // 방출되는 이벤트를 추적하기 위해 counter 속성을 추가합니다.
    div.click();
}, 100);
setTimeout(() => { // 10초가 지나나면 클릭 이벤트를 멈춥니다.
    clearInterval(clickEvent);
}, 10* 1000);