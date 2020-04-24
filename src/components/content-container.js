import AbstractComponent from './abstract-component.js';

const createContentContainer = () => `<section class="films"></section>`;

class ContentContainer extends AbstractComponent {
  getTemplate() {
    return createContentContainer();
  }
}

export default ContentContainer;
