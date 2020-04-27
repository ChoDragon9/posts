### MVC
- MVC의 기본 목적은 사용자의 멘탈모델과 컴퓨터에 존재하는 디지털 모델 간의 차이를 연결하는 것이다. 
- 이상적인 MVC 솔루션은 사용자가 도메인 정보를 직접 보고 조작하는 착각을 지원합니다.

![]({{ '/assets/img/diagram/mvc.svg' | prepend: site.baseurl }})

### MVP
- 스몰토크의 프로그래밍 모델인 MVC는 세 가지 핵심 추상화를 사용한다. 모델은 데이터, 뷰는 화면에 그려지는 방법, 컨트롤러는 사용자 제스처 및 이벤트
- 텔리전트의 전반적인 접근 방식 모델은 모델과 뷰-컨트롤러 간의 분리를 공식화한다. 모델은 데이터 관리, 뷰-컨트롤러은 사용자 인터페이스라는 두 가지 기본 개념을 세분화합니다.
- 이 두 가지 개념은 프로그래머가 다뤄야 하는 가장 기본적인 두 가지 디자인 문제를 담고 있다.
  - 데이터를 어떻게 관리하지?
  - 사용자가 데이터와 어떻게 상호작용하지?
- 데이터 관리를 세분화하여 Model/Selection/Command로 분리합니다.
  - Model : 캡슐화된 데이터, 읽기 및 쓰기 액세스 방법
  - Selection : 데이터 선택 방법, Model 데이터의 여러 하위 세트를 지정하기 위한 추상화
  - Command : 데이터 변경 방법, Model의 Selection에서 수행할 수 있는 작업을 나타내는 추상화
- 사용자 인터페이스을 세분화하여 View/Interactor/Presenter로 분리합니다.
  - View : 데이터 표시
  - Interactor : 이벤트에 따른 데이터의 변경 사항 요청
  - Presenter : Interactor에 따른 적절한 Command를 매핑하는 비즈니스 로직
- 기존의 Controller의 기능이지만 Interactor와 Command를 매핑하는 역할을 고려해서 Presenter라고 했다. 그래서 MVP의 어원이 탄생한다.

![]({{ '/assets/img/diagram/mvp.svg' | prepend: site.baseurl }})

### MVVM
- Model과 View는 MVC에서 정의된 역할과 동일합니다.
  - Model은 상태저장, 비즈니스 로직, 순수한 데이터입니다.
  - View는 시각적인 요소를 담당합니다.
- ViewModel는 View가 데이터 바인딩에 사용할 수 있는 Model을 전문화합니다.
  - Model Type을 View Type으로 변환하는 데이터 변환기 역할
  - View가 Model과 상호작용 할 수 있게 하는 역할
  - UI의 재사용 가능한 부분에 대한 추상적 표현
  - Selection과 Commands를 포함
  
![]({{ '/assets/img/diagram/mvvm.svg' | prepend: site.baseurl }})