import { interval } from 'rxjs';

const counter = interval(1000); // 지정된 밀리세컨드마다 카운트를 Observable로 방출합니다.
const subscription = counter.subscribe({
    next: val => {
        console.log(val);
        if (val >= 10) { // 계속 반복하므로 10번 카운팅되면 구독을 중지합니다.
            subscription.unsubscribe();
        }
    },
    complete: () => console.log('complete') // 무한반복이므로 완료 유형은 호출되지 않습니다.
});