# Operator - 연산자
ReactiveX는 다양한 언어를 지원합니다. 각 언어 별 라이브러리들은 다양한 연산자들을 제공합니다.
공통적으로 사용되는 연산자도 있는 반면에 언어 별로 다른 차별화된 연산자도 있습니다.
또한 각 언어에서 제공하는 메서드의 이름과 형태를 고려하여 차별화된 네이밍 컨벤션도 존재합니다.


## 연산자 체인
거의 모든 연산자들은 옵저버블(<code>Observable</code>) 상에서 동작하며 대상 옵저버블(<code>Observable</code>)이 수정되지 않고 새로운 옵저버블(<code>Observable</code>)을 반환합니다. 이 것은 연산자들을 연달아 호출할 수 있는 연산자 체인을 제공한다는 의미입니다.

RxJS의 v.6으로 오면서 연산자를 통해 반환되는 옵저버블(<code>Observable</code>)을 도트 체이닝(dot-chaining)을 통해 연쇄적으로 사용하는 방법 대신 <code>Pipeable Operators</code>을 사용합니다. 이것은 옵저버블(<code>Observable</code>)의 메서드로 추가된 <code>pipe()</code>메서드를 사용해서 연산자 체인을 수행합니다.

RxJS에서는 도트 체이닝 대신 새로운 <code>Pipeable Operators</code>로 패치된 이유를 아래와 같이 설명합니다.
1. 기존의 연산자들은 Observable.prototype에 추가되어 사용되어 왔습니다. 그렇게 사용하다 누군가가 특정 라이브러리를 제거하게 되면 생각지도 못한 곳에서 문제가 발생될 수 있습니다.
새로운 <code>Pipeable Operators</code>를 사용하면 필요한 연산자를 각 파일로 가져와서 사용하면 됩니다.
2. 연산자들이 덕지덕지 붙은 옵저버블(<code>Observable</code>)은 Webpack 또는 롤업과 같은 툴을 통해 "tree-shakeable"하지 않습니다.(변환이 잘 안된다는 뜻 같습니다.)
하지만 <code>Pipeable Operators</code>를 사용하면 단지 모듈에서 가져온 함수일 뿐입니다.
3. 사용하던 연산자를 사용하지 않게 되면서 제거되지 않고 방치된 연산자를 빌드 도구 또는 lint규칙 그리고 IDE에서 검색할 수 없습니다.
하지만 <code>Pipeable Operators</code>를 사용하면 이 것들을 검색할 수 있습니다.
4. <code>Pipeable Operators</code>를 이용하여 다양한 연산자를 묶어 사용자 연산자를 생산하기 쉽습니다.

사용법은 다음과 같습니다.
<code>pipe()</code>의 매개변수는 무한대로 받을 수 있으며, 모든 매개변수는 순서대로 채이닝되어 최종적으로 옵저버블(<code>Observable</code>)을 반환합니다.
```javascript
옵저버블.pipe(
    연산자1(),
    연산자2(),
    ...
    연산자N()
);
```
사용 예제는 아래의 다른 연산자를 사용하면서 체험할 수 있습니다.

## 연산자의 분류
연산자는 아래와 같이 구분할 수 있습니다.
* [Observable 생성](./creation) : 새로운 옵저버블(<code>Observable</code>)을 만드는 연산자
* [Observable 변환](./transformation) : 옵저버블(<code>Observable</code>)이 배출한 항목을 변환하는 연산자
* [Observable 필터링](./filtering) : 옵저버블(<code>Observable</code>)이 항목을 선택적으로 배출하는 연산자
* [Observable 결합](./combination) : 여러개의 옵저버블(<code>Observable</code>)을 하나의 옵저버블(<code>Observable</code>)로 만드는 연산자
* [오류 처리](./error_handling) : 옵저버블(<code>Observable</code>)에서 던진 오류를 복구할 수 있도록 도와주는 연산자
* [조건 연산](./condition_and_boolean) : 옵저버블(<code>Observable</code>) 또는 옵저버블(<code>Observable</code>)이 배출한 항목을 평가하는 연산자
* [수학과 집계](./mathematical_and_aggregate) : 옵저버블(<code>Observable</code>)이 배출한 항목 전체를 대상으로 평가하는 연산자
* 역압(backpressure) : 옵저버(<code>Observer</code>)가 소비하는 것보다 더 빠르게 항목들을 생산하는 옵저버블(<code>Observable</code>)을 복제하는 연산자
* 연결 가능한 연산자 : 특정 기능에 특화된 옵저버블(<code>Observable</code>)로 가공하는 연산자
* 타 객체로 변환 : 옵저버블(<code>Observable</code>)을 다른 객체로 변환하는 연산자
* [유틸리티(헬퍼)](./utility) : 그 밖에 다양한 헬퍼 연산자

옵저버블(<code>Observable</code>)의 핵심은 용도에 따라 다양한 연산자를 활용하는 것이라고 할 수 있습니다.
모든 연산자를 다 살펴볼 수는 없지만 분류 별로 몇 가지의 연산자를 살펴 보도록 하겠습니다.
