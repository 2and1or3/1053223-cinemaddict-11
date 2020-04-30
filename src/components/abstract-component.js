import {createElement} from '../utils.js';
import {ERRORS} from '../const.js';

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(ERRORS.INSTANCE);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(ERRORS.IMPLEMENT_GET_TEMPLATE);
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
