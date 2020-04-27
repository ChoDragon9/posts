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
<div id="editor-container"></div>

<input type="button" value="Save and Present" id="save">

<h1>Result</h1>
<div id="editor-presentor"></div>

<script>
  const toolbarOptions = [
    ['image', 'bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  const container = new Quill('#editor-container', {
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
  });

  const presentor = new Quill('#editor-presentor', {
    readOnly: true,
    theme: 'bubble'
  });

  window.onload = () => {
    document.querySelector('#save').addEventListener('click', () => {
      const delta = JSON.stringify(container.getContents())
      presentor.setContents(JSON.parse(delta))
    })
  }
</script>

</body>
</html>
```