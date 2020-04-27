* Single Page Application을 개발할 때 페이지 리로드를 방지하기 위해 hash mode와 HTML5 history mode를 사용
* \<router-link>는 HTML5 history mode 지원여부에 따라 미지원시 hash mode로 처리해줌
* 일반적인 <a>는 클릭 시 페이지 리로드가 발생
* <router-link>는 클릭 이벤트를 가로채기 때문에 페이지 리로드가 발생하지 않음

**HTML5 history mode*
* HTML5에서는 `window.history`를 통해 history stack을 조작할 수 있음
* IE9 이하는 지원하지 않음
