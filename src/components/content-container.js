import {createElement} from '../utils.js';

const createContentContainer = () => `<section class="films"></section>`;

class ContentContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createContentContainer();
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

export default ContentContainer;
