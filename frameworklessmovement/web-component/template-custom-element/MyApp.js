export class MyApp extends HTMLElement {
  connectedCallback() {
    window.requestAnimationFrame(() => {
      const appTemplate = document.querySelector('#app');
      this.appendChild(appTemplate.content.cloneNode(true));
    })
  }
}
