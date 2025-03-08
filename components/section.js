class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(".elements__container");
    }
  
    renderItems() {
      this._items.forEach(item => {
        const element = this._renderer(item); // Renderiza el elemento con la función renderer
        this.addItem(element); // Añade el elemento al contenedor
      });
    }
  
    addItem(element) {
      this._container.append(element); // Añade el elemento al final del contenedor
    }
  }