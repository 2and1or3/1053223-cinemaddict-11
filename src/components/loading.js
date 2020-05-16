import AbstractComponent from './abstract-component.js';

const createLoadingTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`
  );
};


class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}

export default Loading;
