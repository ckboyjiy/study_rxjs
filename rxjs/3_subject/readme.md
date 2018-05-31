# Subject - 서브젝트
Subject는 Observer나 Observable처럼 행동하는 Rx의 일부 구현체에서 사용 가능한 일종의 교각 또는 프록시라고 볼 수 있습니다.
즉, Observer와 Observable을 모두 상속했다고 이해하시면 됩니다.

Subject는 Observer처럼 하나 이상의 Observable을 구독할 수도 있으며, Observable이기도 하기 때문에 항목들을 재 방출할 수도 있습니다.

