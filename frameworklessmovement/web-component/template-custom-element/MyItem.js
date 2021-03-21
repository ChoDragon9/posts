export class MyItem extends HTMLElement {
  static template(txt) {
    return `
      <li>
        <a>${txt}</a>
      </li>
    `
  }
  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.innerHTML = MyItem.template(Date.now());
    })
  }
}
