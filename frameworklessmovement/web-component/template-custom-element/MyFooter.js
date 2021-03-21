export class MyFooter extends HTMLElement {
  static template () {
    return `
      <style>
        footer { font-size: 12px; }
      </style>
      <footer>Copyright (c) All right reserved.</footer>
    `
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const shadow = this.attachShadow({mode: 'closed'});
      shadow.innerHTML = MyFooter.template()
    })
  }
}
