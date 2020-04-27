```js
const container = new Quill(element, {
  modules: {
    toolbar: TOOLBAR_OPTIONS
  },
  placeholder,
  theme: 'snow'
})
container.getModule('toolbar').addHandler('image', () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.click()

    input.onchange = () => {
      if (input.files) {
        const file = input.files[0] as File
        uploadFile(file).then((response) => {
          const range = container.getSelection()
          container.insertEmbed(
            range.index,
            'image',
            response.body.url.path
          )
        })
      }
    }
})
```