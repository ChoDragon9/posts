---
title: MVC XEROX PARC
sidebar: auto
---


> 이 문서는 MVC의 히스토리가 담긴 [MVC XEROX PARC 1978-79](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html)을 번역한 문서입니다.

> XEROX PARC(제록스 파크)는 미국 캘리포니아주의 서부에 있는 도시인 팰로앨토 [Palo Alto]에 있는 회사입니다.
PARC는 컴퓨터 연구/개발을 하는 정보 기술 및 하드웨어 시스템에 기여한 것으로 유명한 회사입니다.

1978년 여름부터 1979년 여름까지 저는 제록스 파크의 학습 연구원과 함께 방문 과학자로서 매우 행복하고 고무적인 해를 보냈습니다.
이 그룹은  [Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay)의 비전을 위해 소유자/사용자에 대한 모든 관심 데이터를 포함해야 하는 휴대용 컴퓨터인 [Dynabook](https://en.wikipedia.org/wiki/Dynabook)에 대한 헌신했습니다.
가장 중요한 것은, 이러한 데이터에는 소유자가 이를 조작하는 데 사용한 프로그램이 포함되어 있다는 것입니다. 소유자/사용자는 프로그램을 이해하고 작성할 수 있어야 하며, 따라서 컴퓨터보다 우위를 확보할 수 있어야 합니다.


MVC 노트는 이 배경에 판독해야 합니다. The user was the czar; everything done at LRG was done to support him. 초기 문서에는 MVC에 대한 [몇 가지 배경(1979.03.22)](http://folk.uio.no/trygver/1979/sysreq/SysReq.pdf)이 추가되어 있습니다.


저는 가끔 제 능력보다 더 많은 공을 인정받았습니다. 그래서 저는 [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk)의 독창적인 발명가가 아니라는 것을 강조해야 합니다.
저는 이 혁신적인 혁신에 매우 빠르고 열정적인 사용자 중 한 명일 뿐입니다.
`1978년` 제록스 파크에 있는 `최초의 MVC 노트`를 처음으로 구현하여 썼습니다.
메모는 Model, View, Controller 및 Editor의 네 가지 용어를 정의합니다.
Editor는 View와 마우스 및 키보드와 같은 입력 장치 사이의 인터페이스로 필요할 때 생성하는 사용 후 삭제 구성 요소입니다.

짐 알토프(Jim Althoff)와 다른 사람들은 제가 제록스 파크를 떠난 후에 MVC를 [Smalltalk-80](https://en.wikipedia.org/wiki/Smalltalk) class library에 적용했습니다. 저는 이 일에 관여하지 않았습니다. 짐 알토프(Jim Althoff)는 나와는 조금 다르게 Controller라는 용어를 사용한다. `원래의 MVC의 중요한 측면`은 그것의 `Controller가 그것의 하위 View를 만들고 조정하는 책임`이 있다는 것이었습니다. 또한 이후의 MVC 구현에서는 View가 자신과 관련된 사용자 입력을 수용하고 처리합니다. Controller는 Controller/View 어셈블리와 관련된 입력을 수용하고 처리하며, 현재는 Tool이라고 합니다.

`MVC의 기본 목적`은 `사용자의 멘탈모델과 컴퓨터에 존재하는 디지털 모델 간의 차이를 연결`하는 것입니다.
`이상적인 MVC 솔루션`은 `사용자가 도메인 정보를 직접 보고 조작하는 착각을 지원`합니다.
이 구조는 사용자가 동일한 모델 요소를 다른 컨텍스트에서 동시에 보거나 다른 관점에서 보아야 하는 경우에 유용합니다. 아래 그림은 그 생각을 보여줍니다.

![](http://heim.ifi.uio.no/~trygver/themes/mvc/MVC-2006.gif)

MVC는 사용자가 크고 복잡한 데이터 세트를 제어하는 문제에 대한 일반적인 해결책으로 간주되었습니다.
가장 어려운 부분은 다른 건축적 요소들의 좋은 이름에 부딪히는 것이었습니다. [모델 뷰 편집기(1979.05.12)](http://heim.ifi.uio.no/~trygver/1979/mvc-1/1979-05-MVC.pdf)가 첫 번째 세트였습니다.

특히 [Adelle Goldberg](https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist))와 오랜 토론 끝에 [Model-View-Controller(1979.12.10)](http://heim.ifi.uio.no/~trygver/2007/MVC_Originals.pdf)라는 용어를 사용했습니다.

Controller는 제가 지금 Tool이라고 부르는 곳에 있었습니다. [Smalltalk-80](https://en.wikipedia.org/wiki/Smalltalk) Controller는 Editor라는 네 번째 요소입니다. 이것은 View와 마우스와 키보드 같은 입력 장치 사이의 인터페이스로 필요에 따라 View가 생성하는 사용 후 삭제 구성요소입니다.

MVC 문제는 내가 1979년에 깨달은 것보다 더 많은 측면을 가지고 있습니다. 저는 2003년 8월 20일에 쓰여진 마지막 초안이 서로 다른 측면을 분리하기 위해 패턴 언어를 연구하기 시작했습니다. 그 계획은 현재의 단 한 명의 작가만이 아니라 한 그룹의 작가들에 의해 개선되어야 한다는 것이었습니다. 불행하게도, 그 프로젝트는 그의 시점에서 중단되었습니다.

[MVC Pattern Language(2003.08.20)](http://heim.ifi.uio.no/~trygver/2003/javazone-jaoo/MVC_pattern.pdf)

# 과거 및 현재

## The Model-View-Controller (MVC ). Its Past and Present
- JavaZONE, Oslo, 2003.
- Handout with draft pattern language [PDF](http://heim.ifi.uio.no/~trygver/2003/javazone-jaoo/MVC_pattern.pdf)

MVC는 1978년에 특정 문제에 대한 설계 솔루션으로 구상되었습니다. 최상위 목표는 관련 정보 공간에 대한 사용자의 멘탈모델을 지원하고 사용자가 이 정보를 검사하고 편집할 수 있도록 하는 것이었습니다. 첫 번째 부분에서는 원래 문제를 설명하고 선택한 솔루션에 대해 설명합니다. 두 번째 부분에서는 원래의 아이디어를 설명하고 현재의 당면 과제를 원래 목표까지 포함하도록 범위를 확장합니다. 그것은 모두 요약된 [MVC 패턴 언어](http://heim.ifi.uio.no/~trygver/2003/javazone-jaoo/MVC_pattern.pdf)로 요약되어 있습니다.

## THING-MODEL-VIEW-EDITOR an Example from a planning system.
- Xerox PARC technical note May 1979 [PDF](http://heim.ifi.uio.no/~trygver/1979/mvc-1/1979-05-MVC.pdf)

원래 MVC 리포트입니다. 노르웨이에 있는 Aker Group의 야드는 수년간 네트워크 기술과 임시 방법을 사용하여 계획 및 제어해 왔습니다. 사용된 시스템은 만족스럽지 못하며, 새로운 모델링 도구가 개발되었습니다. 이 도구의 기본 구성 요소는 기존 네트워크의 활동보다 훨씬 더 강력합니다. 그것은 `컴포넌트`라고 불리며, 그것들을 조작하는데 필요한 `자체 데이터와 알고리즘`을 모두 가지고 있습니다. 각 구성요소는 야드의 실제 환경에서 식별 가능한 부분을 나타냅니다. 계획 프로세스는 수신된 정보에 따라 정보를 서로 주고받는 구성 요소로 이루어집니다.

## MODELS - VIEWS - CONTROLLERS
- Xerox PARC technical note December 1979 [PDF](http://heim.ifi.uio.no/~trygver/1979/mvc-2/1979-12-MVC.pdf)

## PROKON/PLAN-A MODELLING TOOL FOR PROJECT PLANNING AND CONTROL. 
- Paper, IFIP Congress, Toronto, Canada, 1977
- First published in the 1977 IFIP Proceedings. 
- Scanned by the author July 2003. [PDF](http://heim.ifi.uio.no/~trygver/1977/Prokon/IFIP-Prokon.pdf)

노르웨이에 있는 Aker Group의 야드는 수년간 네트워크 기술과 임시 방법을 사용하여 계획 및 제어해 왔습니다. 사용한 시스템은 만족스럽지 못하며, 마당을 위해 새로운 표식 도구를 고안했습니다. 이 도구의 기본 구성 요소는 기존 네트워크의 활동보다 훨씬 더 강력합니다.

그것은 `컴포넌트`라고 불리며, 그것들을 조작하는데 `필요한 자체 데이터와 알고리즘`을 모두 가지고 있습니다. 각 구성요소는 야드의 실제 환경에서 식별 가능한 부분을 나타냅니다. 계획 프로세스는 수신된 정보에 따라 정보를 서로 주고받는 구성 요소로 이루어집니다. A/S 버겐스 메카니스케 베르케더 설계부문 기획 및 관리를 위한 실험적 시스템이 개발되었습니다.

## ADMINISTRATIVE CONTROL IN THE SHIPYARD.
- Paper, ICCAS conference, Tokyo, 1973.
- Scanned by the author July 2003 [PDF](http://heim.ifi.uio.no/~trygver/1973/iccas/1973-08-ICCAS.pdf)

야드의 조직은 사용하는 정보 시스템의 영향을 크게 받을 수 있습니다. 시스템 개발은 조직의 원하는 진화에 종속되어야 합니다. 데이터 프로세스 통신의 원칙은 기존 조직을 적합시키고 지속적인 개발에 적응하기 위해 쉽게 몰딩되는 정보 시스템을 구축하기 위한 도구로 도입됩니다. 원리에 대한 설명과 이를 실제 선박 회사에서 시험하기 위해 설계된 새로운 시스템의 개요가 제공됩니다.


***


## 참고문서
- [MVC XEROX PARC 1978-79](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html)
- [PARC(company)](https://en.wikipedia.org/wiki/PARC_(company))
