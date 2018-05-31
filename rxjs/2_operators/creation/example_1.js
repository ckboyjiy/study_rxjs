import { defer, fromEvent, interval } from 'rxjs';
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM()).window;

const div = document.createElement('div');
const clicksOrInterval = defer(function () {
    let aa = Math.random();
    if (aa > 0.5) {
        return fromEvent(div, 'click');
    } else {
        return interval(1000);
    }
});
clicksOrInterval.subscribe(x => console.log('Observer1 : ', x));
clicksOrInterval.subscribe(x => console.log('Observer2 : ', x));
div.click();