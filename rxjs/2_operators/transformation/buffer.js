import { fromEvent, interval } from 'rxjs';
import { buffer } from 'rxjs/operators';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

const div = document.createElement('div');
const clicks = fromEvent(div, 'click');
const repeater = interval(100); // 0.1 초마다 일련번호가 방출됩니다.
const buffered = repeater.pipe(
    buffer(clicks) // 클릭이벤트가 일어날 때까지 repeater에서 발생되는 항목을 버퍼에 저장했다가 한번에 배열로 방출합니다.
);
buffered.subscribe(x => console.log(x));

const clickEvent = setInterval(()=> { // 1초 마다 클릭 이벤트를 생성합니다.
    div.click();
}, 1000);
setTimeout(() => { // 10초가 지나나면 클릭 이벤트를 멈춥니다.
    clearInterval(clickEvent);
}, 10* 1000);