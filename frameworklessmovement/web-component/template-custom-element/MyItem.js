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
      const shadow = this.attachShadow({mode: 'closed'});
      shadow.innerHTML = MyItem.template(Date.now());
    })
  }
}
