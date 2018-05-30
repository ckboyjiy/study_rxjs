import { fromEvent } from 'rxjs';
import { JSDOM } from 'jsdom'; // nodejs에서 DOM과 HTML을 사용할 수 있게 해주는 라이브러리입니다.
const { document } = (new JSDOM()).window; // 필요한 document 객체만 변수에 저장합니다.

// 예제 2와 동일한 코드 구성입니다.
const btn = document.createElement('button'); // button 엘리먼트를 만듭니다.
fromEvent(btn, 'click').subscribe({ // 대상 엘리먼트와 이벤트명을 매개변수로 넘긴 후 구독합니다.
    next(e) {console.log(e);} // Observable로 부터 발행된 값(이벤트)을 수신합니다.
})
btn.click(); // 실제 버튼을 클릭합니다.