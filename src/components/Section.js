export class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza todos los items usando la función renderer
  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element); // append por defecto
    });
  }

  // Inserta un elemento DOM en el contenedor
  addItem(element, prepend = false) {
    if (prepend) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  // Permite actualizar la lista de items si hace falta
  setItems(items = []) {
    this._items = items;
  }
}
