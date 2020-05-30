import {createElement} from '../utils.js';
import {Errors} from '../const.js';

const HIDE_CLASS = `visually-hidden`;

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(Errors.INSTANCE);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(Errors.IMPLEMENT_GET_TEMPLATE);
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

  show() {
    this.getElement().classList.remove(HIDE_CLASS);
  }

  hide() {
    this.getElement().classList.add(HIDE_CLASS);
  }
}

export default AbstractComponent;
