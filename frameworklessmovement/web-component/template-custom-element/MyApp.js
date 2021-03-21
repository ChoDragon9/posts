export class MyApp extends HTMLElement {
  static template() {
    return `
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
      this.innerHTML = MyApp.template();
    })
  }
}
