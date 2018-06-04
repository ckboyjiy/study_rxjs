import { animationFrameScheduler } from 'rxjs';

var div = document.querySelector('.some-div');

animationFrameScheduler.schedule(function (height) {
    div.style.height = height + "px";
    this.schedule(height + 1); // 'this'는 현재 실행 중인 액션을 참조합니다. scheduler을 재귀 호출하여 계속 상태를 변경합니다.
}, 0, 0);
