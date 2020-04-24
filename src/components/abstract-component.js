import {createElement} from '../utils.js';

const ERRORS = {
  INSTANCE: `Нельзя создавать экземпляры абстрактного класса`,
  IMPLEMENT: `Метод getTemplate не имплементирован`,
};

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(ERRORS.INSTANCE);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(ERRORS.IMPLEMENT);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default AbstractComponent;
