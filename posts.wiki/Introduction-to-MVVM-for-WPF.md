---
title: Introduction to MVVM for WPF
sidebar: auto
---

> 이 문서는 MVVM의 최초로 언급된 [Introduction to Model/View/ViewModel pattern for building WPF apps](https://blogs.msdn.microsoft.com/johngossman/2005/10/08/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps/)를 번역한 문서입니다. 

## 본문요약
- Model과 View는 MVC에서 정의된 역할과 동일합니다.
  - Model은 상태저장, 비즈니스 로직, 순수한 데이터입니다.
  - View는 시각적인 요소를 담당합니다.
- ViewModel는 View가 데이터 바인딩에 사용할 수 있는 Model을 전문화합니다.
  - Model Type을 View Type으로 변환하는 데이터 변환기 역할
  - View가 Model과 상호작용 할 수 있게 하는 역할
  - UI의 재사용 가능한 부분에 대한 추상적 표현
  - Selection과 Commands를 포함

## 번역

MVVM은 MVC의 변형으로, 현대 UI 개발 플랫폼에 맞게 제작되었으며, 개발자가 아닌 디자이너가 담당합니다.
이 설계는 HTML 또는 XAML과 같은 선언적 형태로 거의 항상 수행되며, Dreamweaver, Flash 또는 Sparkle과 같은 WYSIWYG 도구를 사용하는 경우가 매우 많습니다. 전체 애플리케이션이 하나의 환경과 언어를 사용하여 구축되는 Smalltalk 기원에서 웹의 매우 친숙한 현대적 환경 및 현재 Avalon 개발로 발전하는 MVC 또한 MVVM은 데이터 바인딩을 위한 일반적인 메커니즘에 의존합니다. 나중에 그 메커니즘에 의존합니다.

MVC에서 정의된 Model은, `상태를 저장`하고 `문제 영역을 처리하는 데이터` 또는 `비즈니스 로직`이며, 코드로 작성되거나 관계형 테이블로 암호화된 `순수 데이터`로 표현됩니다. MVVM의 View는 GUI의 시각적 요소, 버튼, 윈도우, 그래픽 및 보다 복잡한 제어로 구성됩니다.
키보드 단축키를 인코딩하고 컨트롤 자체는 MVC의 Controller 책임인 입력 장치와의 상호 작용을 관리합니다. (현대식 GUI 개발에서 컨트롤러에 정확히 일어났던 것은 긴 변형입니다. 저는 그것이 그냥 희미해졌다고 생각하는 경향이 있습니다. 그것은 여전히 존재하지만, 우리는 1979년에 그랬던 것처럼 그것에 대해 생각할 필요가 없습니다.)

View는 거의 항상 `선언적`으로 정의되며, 도구 및 선언 언어의 특성상 View 클래스에서 MVC가 인코딩하는 일부 View 상태는 표현하기 쉽지 않습니다. 
예를 들어 UI에는 컨트롤의 동작이나 시각의 모양을 변경하는 "보기 모드" 및 "편집 모드"와 같은 여러 가지 상호 작용 모드가 있을 수 있지만 이러한 모드는 항상 XAML에서 크게 시작할 수 있는 것은 아닙니다. 우리는 이 문제를 나중에 해결할 것이다.

이 시점에서 데이터 바인딩이 수행됩니다. 간단한 예에서 View는 Model에 직접 바인딩됩니다. Model의 일부는 단방향 데이터 바인딩으로 보기에만 표시됩니다. Model의 다른 부분은 직접 편집할 수 있습니다. 예를 들어 Model의 Boolean은 CheckBox에 데이터를 바인딩하거나 문자열 필드를 TextBox에 바인딩할 수 있습니다.


그러나 실제로는 특히 Model이 애플리케이션 개발자가 제어할 수 없는 기존 클래스 또는 데이터 스키마인 경우 애플리케이션 UI의 일부만 Model에 직접 데이터를 바인딩할 수 있습니다. Model에는 컨트롤에 직접 매핑할 수 없는 데이터 유형이 있을 수 있습니다. UI는 기존 Model의 엄격한 정의에는 맞지 않지만 Model에 포함되어 있지 않은 코드로 구현해야 하는 복잡한 작업을 수행할 수 있습니다. 마지막으로 우리는 선택이나 모드와 같은 보기 상태를 넣을 장소가 필요하다. 

`ViewModel`은 이러한 작업을 담당합니다.
이 용어는 `View의 Model`을 의미하며 View의 추상화로 간주될 수 있지만 `View가 데이터 바인딩에 사용할 수 있는 Model을 전문화`합니다.
이 역할에서 ViewModel은 `Model Type을 View Type으로 변환하는 데이터 변환기`를 포함하며,
`View가 Model과 상호 작용하는 데 사용할 수 있는 명령`을 포함합니다.


이러한 아이디어를 개발하고, 특히 ViewModel의 View를 이후 포스트에서 Commands에 바인딩하는 방법에 대해 설명하겠습니다. 그러나 이 패턴을 명확히 하는 가장 빠른 방법은 다음과 같은 몇 가지 예를 제공하는 것입니다.

위의 그림은 스파클 UI에 있는 세 개의 편집 패널을 보여줍니다. 각 편집 패널은 MVVM 패턴을 사용하여 개발되었습니다. 가장 간단한 것은 맨 위에 있는 라이브러리 패널입니다. 

Model은 어셈블리 목록이며, 각 어셈블리 목록과 연결됩니다. View는 패널 크롬 컨트롤과 일련의 스타일 및 데이터 플레이트 목록을 표시하는 Box 컨트롤의 목록입니다. ComboBox는 어셈블리 이름으로 직접 연결되며 목록 상자의 항목은 제어 이름에서 텍스트를 가져옵니다. ViewModel은 현재 선택된 공통 컴포넌트이며, 하나의 컨트롤을 삽입하기 위한 명령어입니다. 왜 선택사항이 View에 남아 있지 않은지 궁금합니다. 이것은 View의 많은 컨트롤이 단일 선택에 따라 조정되어야 하기 때문입니다. 모든 ViewModel에서 선택한 항목의 단일 표현에 바인딩하는 것이 모든 ViewModel에서 더 쉽습니다. ComboBox에 의해 선택되며 또한 ListBox에 의해 표시되는 목록 데이터입니다. 또한 설계자는 조정 항목을 복사하지 않고 공통 컴포넌트에 ListBox를 사용하고 제어 목록에 ComboBox를 사용하도록 전환할 수 있습니다.


모양 패널은 스파클 편집 영역에서 선택한 모양 또는 컨트롤을 Model로 사용합니다. View에는 선택 항목에 대한 흥미로운 속성(기본적으로 모든 펜 및 브러시 속성, 브러시 또는 펜이 솔리드, 그라데이션 등) 및 색상 구성 요소 편집을 위한 색상 스펙트럼을 표시하는 ListBox가 있습니다. ViewModel에는 선택한 속성, 그라데이션 편집 시 선택된 그라데이션 정지, 색상 스펙트럼의 위치에 색상을 매핑하기 위한 데이터 변환기, 편집 중인 펜과 브러시를 변경하는 명령이 포함됩니다. 이 경우 Model은 Avalon에 의해 우리에게 주어졌고, ViewModel은 쉽게 근본적으로 다른 무언가로 바뀔 수 있었고, ViewModel은 이 `UI의 재사용 가능한 부분에 대한 추상적 표현`을 제공합니다.


마지막 예는 우리의 프로젝트 패널입니다. 여기 Model은 MSBuild Project입니다. 이전에 존재했던 Model 클래스입니다. View는 트리 컨트롤, 스크롤 영역이며 컨텍스트 메뉴를 포함합니다. ViewModel은 Avalon 없이 설계되었으며(명령줄에서 완벽하게 작동) `데이터가 바인딩`될 수 있도록 설계되었으며 `Selection 및 Commands가 포함`되어 있습니다. 


MVVM 패턴을 탐색하면 UI 문제가 해당 용어에 빠르게 표시됩니다. 실제로 전체 스파클 UI는 패턴을 사용하여 정의됩니다. 모양 패널의 Model인 "편집 영역에서 선택한 모양 또는 컨트롤"은 그 자체로 Scene 편집기의 ViewModel 개념입니다. 스파클 내부의 패널 레이아웃에는 모든 등록된 패널 목록, View를 위치시키는 분할기가 있는 그리드, 그리고 현재 표시되는 패널과 해당 패널의 논리적 컨테이너가 포함된 ViewModel로 구성된 Model이 있습니다.

## 원본
[Introduction to Model/View/ViewModel pattern for building WPF apps](https://blogs.msdn.microsoft.com/johngossman/2005/10/08/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps/)
