export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(data) {
    data.forEach((elem) => {
      this._renderer(elem);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
