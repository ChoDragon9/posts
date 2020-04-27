### 글의 목적
Cross-Origin Resource Sharing! 앞 글자만 따서 CORS라고 부른다. 내 경험상 CORS는 서로 다른 도메인을 사용하는 클라이언트와 API 서버가 통신할 때 발생하는 첫번째 현상이다.

최근에는 HTTP Cookie를 사용할 일이 생겼는 데, Cookie를 사용하면서 CORS에 대한 지식을 새롭게 알게되었다. 그래서 CORS와 HTTP Cookie를 처리하는 방법에 대한 내용을 정리했다.

### CORS란
CORS는 다른 도메인을 사용하는 클라이언트가 서버에게 요청할 때 발생하는 보안 매커니즘이다. 클라이언트가 다른 도메인의 서버에 요청하면 **Cross-Origin HTTP 요청**에 의해 요청하게 된다. **Cross-Origin HTTP 요청**에 따른 HTTP 요청과 응답은 CORS 매커니즘으로 구성되야 한다.

서버에서는 다른 도메인을 사용하는 클라이언트의 요청이 왔을 때 허용/거부 여부를 설정한다. 허용/거부에 대한 설정은 HTTP Header 중 **Access-Control-Allow-Origin**을 통해서 한다.

**Access-Control-Allow-Origin**에 허용할 도메인을 명시하거나 모든 도메인을 허용할 수 있는 와일드 카드(*)를 작성한다.

#### [예제] Access-Control-Allow-Origin 사용전 현상
> 클라이언트(http://localhost:3000), 서버(http://localhost:4000)

**Access-Control-Allow-Origin**을 서버 응답 헤더에 설정하지 않으면 정책에 대한 오류를 발생한다.

##### HTTP 요청
```js
fetch('http://localhost:4000')
```

##### Chrome 개발자 도구 > Console
Access to fetch at 'http://localhost:4000/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

#### [예제] Access-Control-Allow-Origin 사용후 현상
**Access-Control-Allow-Origin**를 서버 응답 헤더에 설정하면 정상적으로 동작된다.

##### HTTP 요청
```js
fetch('http://localhost:4000')
```

##### Chrome 개발자 도구 > Network > Response Headers
```
Access-Control-Allow-Origin: *
Content-Length: 12
Content-Type: text/html; charset=utf-8
Date: Mon, 21 Oct 2019 21:56:47 GMT
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
X-Powered-By: Express
```

### HTTP Cookie 사용을 위한 Credentials 설정
#### HTTP Cookie를 사용하게된 상황
먼저 HTTP Cookie를 사용하게 되었던 이유는 로그인과 로그인 여부를 판단하기 위해서다. 서비스 구성은 클라이언트 서비스, API 서버, 로그인 서비스가 세가지로 각각 다른 도메인을 사용하고 있다.

로그인 서비스에서 로그인 완료 후 Cookie에 로그인 완료 여부를 담아주고 클라이언트 서비스로 Redirect를 해준다. Cookie를 클라이언트 서비스에서 접근할 수 없게 Cookie는 HttpOnly로 설정되어 있다.

> Cookie가 HttpOnly로 설정되면 Javascript의 `document.cookie`로 접근할 수 없다.

클라이언트 서비스에서는 **로그인 여부를 판단**하기 위해서 API 서버에 요청하게 된다. 이때 API 서버에서 Cookie를 사용하기 위해서 **클라이언트와 서버의 Credentials** 설정이 필요하다.

#### Credentials 설정
클라이언트와 서버에서는 모두 Credentials를 활성화 해야 한다.

##### 클라이언트 Credentials 설정
클라이언트에서는 Javascript API 에 따라 다르게 설정할 수 있다. 대표적으로 사용하는 fetch, XMLHttpRequest 예시이다.
```js
fetch('http://localhost:4000', {
  credentials: 'include'
})
```
```js
const xhr = new XMLHttpRequest();
const url = 'http://localhost:4000';

xhr.open('GET', url, true);
xhr.withCredentials = true;
xhr.send();
```

##### 서버 Credentials 설정
서버에서 Credentials은 응답 헤더에 설정한다. **Access-Control-Allow-Credentials** 명의 헤더에 true로 설정하면 된다.
```js
res.header("Access-Control-Allow-Credentials", true)
```

**Credentials**를 활성화 후 HTTP 요청을 하게되면 아래와 같은 에러가 발생한다.

Access to fetch at 'http://localhost:4000/' from origin 'http://localhost:3000' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.

**Credentials** 활성화 후에는 **Access-Control-Allow-Origin**에 와일드 카드(*)를 사용할 수 없기 때문이다.

여기서 주의할 점은 Credentials를 활성화하는 것으로 클라이언트와 서버의 상황이 다르다. 서버에서는 Credentials를 활성화하는 것으로 Cookie를 접근할 수 있기 때문에 정상동작처럼 보인다. 하지만 클라이언트에서는 CORS 정책으로 HTTP 응답을 확인할 수 없다.

#### Credentials와 Access-Control-Allow-Origin 설정
서버 HTTP 응답 헤더 중 **Access-Control-Allow-Origin**에 허용할 클라이언트의 도메인을 작성한다. 설정 후 클라이언트 응답 헤더를 확인하면 정상 동작을 확인 할 수 있다.

##### 서버 HTTP 응답 헤더 설정
```js
res.header("Access-Control-Allow-Origin", "http://localhost:3000");
res.header("Access-Control-Allow-Credentials", true);
```

##### Chrome 개발자 도구 > Network > Response Headers
```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:3000
Content-Length: 12
Content-Type: text/html; charset=utf-8
Date: Mon, 21 Oct 2019 22:46:47 GMT
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
X-Powered-By: Express
```

### 결론
클라이언트와 API 서버가 서로 다른 도메인을 사용하는 것은 현업에서 자주 사용되는 패턴이다. 이 패턴에서 서비스 초기 개발 시 한번쯤은 발생하게 된다. 단순히 CORS 정책을 따르면 해결 가능하다. CORS에 대한 이슈는 클라이언트와 서버 담당자 어느 한쪽에서만 숙지하는 게 아니라 모두 이해가 필요하다. 이와 같은 이슈는 CORS 정책을 따름으로서 매끄럽게 해결하고 비즈니스 개발에 집중하는 게 좋다고 생각한다.