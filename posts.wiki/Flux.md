---
title: Flux
sidebar: auto
---

## 소개
Flux는 클라이언트 사이드 어플리케이션 아키텍쳐이다. Flux는 대형 MVC 어플리케이션에서 나타나는 데이터 간의 의존성과 연쇄적인 갱신에서 발생되는 예측하기 힘든 데이터 흐름을 올바르게 다루기 위해 만들어 졌다.

양방향 데이터 바인딩은 연속적인 갱신이 발생하고 객체 하나의 변경이 다른 객체를 변경하게 되어 실제 필요한 업데이트보다 더 많은 분량을 실행하게 된다. 어플리케이션의 규모가 커지면 데이터의 연속적인 갱신이 되는 상황에서는 사용자 상호작용의 결과가 어떤 변화를 만드는지 예측하는데 어려워진다. 갱신으로 인한 데이터 변경이 한 차례만 이뤄진다면 전체 어플리케이션은 좀 더 예측하기 쉽게 된다.

Flux는 MVC와는 다르게 단방향으로 데이터가 흐른다. 
Flux는 Actions, Dispatcher, Stores, Views로 구성되며 각 부분들은 단방향으로만 데이터가 흐르게 되어 있다.

각 구성의 역할은 이렇다. Action은 사용자의 상호작용와 서버 상호작용 등이 될 수 있으며 type 프로퍼티에 역할을 지정한다. Dispatcher는 모든 Action을 받으며, Stores가 콜백들 등록할 수 있다. Stores는 데이터와 비즈니스 로직을 담당하고 Views가 변경감시를 할 수 있도록 제공한다. Views는 Controller-Views-Views 형태를 이루고, Store에게 데이터를 가져와 View를 갱신한다.

데이터가 흐르게 되면 이렇게 흐르게 된다. 사용자의 상호작용이 발생되면 View는 Action에게 전달한다. Action은 서버에서 데이터를 요청하고 응답이 오면 Dispatcher에게 type과 데이터를 전파한다. Dispatcher는 모든 Stores에게 type과 데이터를 전파한다. Stores는 전달된 type이 상태와 의존이 있으면 Views 변경 이벤트를 전파한다. Views는 변화를 감지하고 Store에게 새로운 데이터를 가져온 뒤 모든 Views에게 새로운 데이터를 제공한다.

## Dispatcher
Dispatcher는 Flux 아키텍쳐에서 단일로 구성되며 중앙 허브로 모든 데이터 흐름을 관리한다.
Store의 콜백을 등록받고 Action을 Store에게 배분해주는 동작을 한다.
어플리케이션의 규모가 커지면 Dispatcher의 역할은 더욱 필수적이다. Store 간의 의존성을 특정 순서로 콜백을 실행하는 과정을 관리한다.

## Stores
Store는 상태와 로직을 담당한다. Store는 어플리케이션 내의 개별적인 도메인에서 어플리케이션의 상태를 관리한다.
하나의 어플리케이션이라도 각 기능별로 Store를 가질 수 있다. Store는 Dispatcher에 콜백을 등록한다. 콜백은 Action의 type을 인자로 전달 받고 상태를 변경한다. 상태가 변경되면 Views에게 변경 이벤트를 전파한다. Store는View에 상태를 요청할 수 있도록 getter를 제공한다.

## Views
Flux의 View는 Controller-View라고 부른다. Store를 통해 변경 이벤트를 전파받으면 Store에게 상태를 요청한다. View는 부모-자식 관계를 가질 수 있으며 부모가 자식 View에게 상태를 전달한다. 그래서 Flux의 Views는 Controller-Views-Views를 가질 수 있다.

## Actions
Action은 사용자 상호작용와 서버 상호작용을 담당한다. 사용자 상호작용은 View를 통해 실행된다.
서버 상호작용은 웹사이트 초기화 시 서버에서 제공하는 초기 상태를 전달할 때 실행된다.

## 참고
https://haruair.github.io/flux/docs/overview.html
