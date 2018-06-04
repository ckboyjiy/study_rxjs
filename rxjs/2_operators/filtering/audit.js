import { fromEvent, interval } from 'rxjs';
import { audit } from 'rxjs/operators';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

const div = document.createElement('div');
const clicks = fromEvent(div, 'click');
clicks.pipe(
    audit(ev => interval(1000))
/*
 * audit 내부에 interval(1000) 옵저버블을 생성하여 리턴합니다.
 * 이 내부 옵저버블이 수행되는 동안 div로부터 발행된 이벤트는 무시 됩니다.
 * 이 내부 옵저버블이 완료되면 div로부터 발행된 마지막 한개이벤트만 방출됩니다.
 * pipe 구문을 제거 후 비교해보면 좋을 것 같습니다.
 */
).subscribe(x => console.log(x, x.target.getAttribute('counter')));

let divId = 1;
const clickEvent = setInterval(()=> { // 0.1초 마다 클릭 이벤트를 생성합니다.
    div.setAttribute('counter', divId++); // 방출되는 이벤트를 추적하기 위해 counter 속성을 추가합니다.
    div.click();
}, 100);
setTimeout(() => { // 10초가 지나나면 클릭 이벤트를 멈춥니다.
    clearInterval(clickEvent);
}, 10* 1000);