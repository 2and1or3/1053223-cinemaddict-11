import AbstractComponent from './abstract-component.js';

const createFilmsListExtraTemplate = function (title) {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

class FilmsExtra extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
    this._innerContainer = null;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._title);
  }

  getInnerContainer() {
    if (!this._innerContainer) {
      this._innerContainer = this.getElement().querySelector(`.films-list__container`);
    }

    return this._innerContainer;
  }
}

export default FilmsExtra;
