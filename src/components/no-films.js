import AbstractComponent from './abstract-component.js';

const createNoFilmsTemplate = () => `<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>`;

class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}

export default NoFilms;
