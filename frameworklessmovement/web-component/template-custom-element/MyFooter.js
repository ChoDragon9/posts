export class MyFooter extends HTMLElement {
  connectedCallback() {
    window.requestAnimationFrame(() => {
      const footerTemplate = document.querySelector('#footer');
      this.appendChild(footerTemplate.content.cloneNode(true));
    })
  }
}
