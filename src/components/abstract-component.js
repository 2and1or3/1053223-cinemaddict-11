import {createElement} from '../utils.js';

const ABSTRACT_ERRORS = {
  INSTANCE: `Нельзя создавать экземпляры абстрактного класса`,
  IMPLEMENT: `Метод getTemplate не имплементирован`,
};

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(ABSTRACT_ERRORS.INSTANCE);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(ABSTRACT_ERRORS.IMPLEMENT);
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
