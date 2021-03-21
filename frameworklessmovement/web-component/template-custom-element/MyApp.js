export class MyApp extends HTMLElement {
  static template() {
    return `
      <style>
        * {
          font-weight: bold;
        }
      </style>
      <ul>
        <my-item></my-item>
        <my-item></my-item>
        <my-item></my-item>
      </ul>
      <my-footer></my-footer>
    `
  }
  connectedCallback() {
    window.requestAnimationFrame(() => {
      const shadow = this.attachShadow({mode: 'closed'});
      shadow.innerHTML = MyApp.template();
    })
  }
}
