import {createElement} from '../utils.js';

const createLoadButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

class LoadButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadButtonTemplate();
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

export default LoadButton;
