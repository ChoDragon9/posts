> [TinyMCE](https://www.tiny.cloud/docs/quick-start/)

> 에디터에 작성된 내용을 저장하기 위해서는 form에서 submit을 해야 가져올 수 있다

```html
<!DOCTYPE html>
<html>
<head>
  <script
    src='https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js'
    referrerpolicy="origin"></script>
</head>
<body>

<h1>TinyMCE Quick Start Guide</h1>
<form method="post" id="myForm">
  <textarea id="mytextarea" name="mytextarea">Hello, World!</textarea>
  <input type="submit" value="Submit and Extract Textarea Value">
  <input type="button" value="Extract Textarea Value" id="myBtn">
</form>

<script>
  const getElem = selector => document.querySelector(selector)
  const log = console.log
  
  // 초기화
  tinymce.init({
    selector: '#mytextarea'
  });
  
  window.onload = () => {
    getElem('#myForm').onsubmit = (event) => {
      log(getElem('#mytextarea').value)
      event.preventDefault()
    }
    getElem('#myBtn').onclick = () => {
      log(getElem('#mytextarea').value)
    }
  }
</script>
</body>
</html>
```