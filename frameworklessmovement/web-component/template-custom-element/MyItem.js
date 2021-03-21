export class MyItem extends HTMLElement {
  connectedCallback() {
    window.requestAnimationFrame(() => {
      const itemTemplate = document.querySelector('#item');
      const clonedItem = itemTemplate.content.cloneNode(true);
      clonedItem.querySelector('a').textContent = Date.now();
      this.appendChild(clonedItem);
    })
  }
}
