### Screen Capture : https://www.w3.org/TR/webdriver/#screen-capture
Viewport의 Framebuffer의 스냅샷을 가져와 PNG 이미지로 만듬.

#### 프레임버퍼를 바운딩 박스에 그리는 과정
주어진 사각형를 기준으로 바운딩 박스에 그림을 그리는 데, 스크린샷을 찍을 때 document를 전달하기 때문에 여기에 사각형은 document임.
1. viewport의 가로/세로 사이즈 둘중 하나라도 0px이면 return error
2. 패인팅되는 부분은 뷰포트의 (x, y)부터 (x + width, y + height)까지
3. 캔버스를 새로 생성 후 캔버스의 2D 컨텍스트 모드로 설정한 뒤 캔버스에 패인팅
4. 캔버스를 리턴함

#### 모니터 출력 원리
1. User Application에서 *Frame Buffer Data 전송
2. LCD *Driver(Frame buffer driver)가 수신
3. LCD Controller(Frame buffer)가 *TFT-LCD에 출력

#### 용어 정의
* [Bounding Box](https://en.wikipedia.org/wiki/Minimum_bounding_box) : Geometry를 그리는 최소 사이즈
* [TFT-LCD(Thin Film Transistor)](http://blog.lgdisplay.com/2016/04/tft/) : 디스플레이의 기본 단위인 픽셀(Pixel)을 제어하는, 일종의 스위치 역할을 담당하는 반도체 소자
* Frame Buffer : Linux System에서 그래픽을 표현할 수 있는 Hardware, PC에서는 그래픽 카드를 이야기함
* [Device Driver](https://ko.wikipedia.org/wiki/%EC%9E%A5%EC%B9%98_%EB%93%9C%EB%9D%BC%EC%9D%B4%EB%B2%84) : 특정 하드웨어나 장치를 제어하기 위한 커널의 일부분으로 동작하는 프로그램