import { Observable } from 'rxjs';
import { JSDOM } from 'jsdom'; // nodejs에서 DOM과 HTML을 사용할 수 있게 해주는 라이브러리입니다.
const { document } = (new JSDOM()).window; // 필요한 document 객체만 변수에 저장합니다.

const btn = document.createElement('button'); // button 엘리먼트를 만듭니다.

function fromEvent(target, eventName) { // 이벤트를 Observable로 수신할 엘리먼트와 수신할 이벤트 이름을 매개변수로 받습니다.
    return new Observable(observer => { // Observable 객체를 반환합니다.
        const handler = (e) => observer.next(e); // 대상 이벤트를 수신하면 Observable에 이벤트를 발행합니다.
        target.addEventListener(eventName, handler); // 대상 엘리먼트에 이벤트를 바인딩합니다.
        return () => {
            target.removeEventListener(eventName); // 작업이 완료되면 이벤트를 언바인딩 합니다.
        }
    })
}

fromEvent(btn, 'click').subscribe({ // 대상 엘리먼트와 이벤트명을 매개변수로 넘긴 후 구독합니다.
    next(e) {console.log(e);} // Observable로 부터 발행된 값(이벤트)을 수신합니다.
})

btn.click(); // 실제 버튼을 클릭합니다.