import AbstractComponent from './abstract-component.js';

class AbstractSmartComponent extends AbstractComponent {
  rerender() {
    const oldElement = this._element;
    this.removeElement();
    const parent = oldElement.parentElement;
    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
  }
}

export default AbstractSmartComponent;
