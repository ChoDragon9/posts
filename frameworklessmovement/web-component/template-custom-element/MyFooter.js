export class MyFooter extends HTMLElement {
  static template () {
    return `
      <footer>Copyright (c) All right reserved.</footer>
    `
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.innerHTML = MyFooter.template()
    })
  }
}
