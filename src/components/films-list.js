import AbstractComponent from './abstract-component.js';

const createFilmsList = function () {
  return (
    `<section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
     </section>`
  );
};

class FilmsList extends AbstractComponent {
  constructor() {
    super();
    this._innerContainer = this.getElement().querySelector(`.films-list__container`);
  }

  getTemplate() {
    return createFilmsList();
  }

  getInnerContainer() {
    return this._innerContainer;
  }
}

export default FilmsList;
