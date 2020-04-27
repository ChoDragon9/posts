> https://quilljs.com/

```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

  <style>
    #editor-container {
      height: 375px;
    }
  </style>
</head>
<body>

<h1>Editor</h1>
<div id="editor-container">
</div>

<h1>Result</h1>
<div id="editor-presentor"></div>

<script>
  const container = new Quill('#editor-container', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });

  const presentor = new Quill('#editor-presentor', {
    readOnly: true,
    theme: 'bubble'
  });

  container.on('editor-change', () => {
    presentor.setContents(container.getContents())
  })
</script>

</body>
</html>
```

### 장점
- 이미지를 base64로 인코딩된 파일을 사용하기 때문에 서버의 의존성이 없어짐

### 단점
- HTML로 Extract하는 API 가 없음
```js
document.querySelector('#save').addEventListener('click', () => {
  const delta = JSON.stringify(container.getContents())
  presentor.setContents(JSON.parse(delta))
})
```