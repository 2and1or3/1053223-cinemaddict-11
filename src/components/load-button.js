import AbstractComponent from './abstract-component.js';

const createLoadButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

class LoadButton extends AbstractComponent {
  getTemplate() {
    return createLoadButtonTemplate();
  }

  setClickHandler(cb) {
    this.getElement().addEventListener(`click`, cb);
  }
}

export default LoadButton;
