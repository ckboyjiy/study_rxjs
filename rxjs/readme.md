# Begin Reactive Extensions  for JavaScript - RxJS
RxJS의 간단한 소개와 설치방법을 안내합니다.

## RxJS란?
Rx의 자바스크립트 버전의 라이브러리입니다.

RxJS는 관찰 가능한 시퀀스를 사용하여 비동기 및 이벤트 기반 프로그램을 작성하기 위한 라이브러리입니다.

옵저버블(<code>Observable</code>)과 Observer, Subject들, Scheduler들 그리고 다양한 연산자(Operator)를 사용하여 비동기 이벤트를 처리할 수 있습니다.

RxJS는 옵저버 패턴과 이터레이터 패턴을 결합하고 컬렉션을 사용한 함수형 프로그래밍을 통해 이벤트 시퀀스를 관리하는 이상적인 방법입니다.

RxJS의 핵심 개념은 아래와 같습니다.
* **Observable**: 미래의 값 또는 이벤트의 호출 가능한 컬렉션의 아이디어를 나타냅니다.
* **Observer** : 옵저버블(<code>Observable</code>)에 의해 전달된 값을 구독하는 콜백 컬렉션입니다.
* **Subscription** : 옵저버블(<code>Observable</code>)의 실행을 나타내며, 주로 실행 취소에 사용됩니다.
* **Operators** : map, filter, concat, flatMap 등과 같은 연산을 사용하여 컬렉션을 처리하는 함수형 프로그래밍 스타일을 가능하게 만드는 순수 함수입니다.
* **Subject** : EventEmitter와 같이 여러 옵저버블(<code>Observable</code>)들에 값 또는 이벤트를 멀티 캐스팅하는 유일한 방법입니다.
* **Schedulers** : 중앙 처리된 디스패쳐로 동시성을 제어함으로써, 연산이 발생할 때를 조절할 수 있습니다.

## RxJS 설치하기
> 이 예제의 RxJS 버전은 6.2.0입니다.

npm을 이용하여 모듈을 다운로드 합니다.
<pre><code>> npm install rxjs</code></pre>

아니면 다양한 CDN 사이트에서 URL을 제공받아 사용하실 수 있습니다.

## RxJS 추가하기
RxJS 패키지를 설치 후 여러 사이트 및 책을 보고 사용하다 보면 임포트 과정에서 에러가 나오는 경우가 많다.
RxJS는 버전마다 모듈명(또는 네임스페이스)가 다른 경우가 있으니 자신이 설치한 버전에 맞게 정확히 사용하도록 하자.

```javascript
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
```

위 방식은 npm을 이용한 ES6스타일로 다른 환경에서는 아래의 사용법을 참고하시기 바랍니다.

#### npm과 CommonJs
설치
```
> npm install rxjs
```

사용
```javascript
const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');
```

#### CDN
URL
<pre>https://unpkg.com/rxjs/bundles/rxjs.umd.min.js</pre>

사용
```javascript
const { Observable, Subject, ReplaySubject, from, of, range } = rxjs;
const { map, filter, switchMap } = rxjs.operators;
```


> 이 저장소의 예제들은 바벨 트랜스파일러를 이용하여 트랜스파일합니다.
nodejs로 예제를 실행하기 위해서는 nodejs의 파라미터로 -r babel-register를 추가하셔야 됩니다.
