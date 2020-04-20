import {createElement} from '../utils.js';

const createFilterTemplate = (filter, isChecked) => {
  const {title, count} = filter;
  const activeClass = isChecked ? `main-navigation__item--active` : ``;

  const template = !count ? `<a href="#${title}" class="main-navigation__item ${activeClass}">All movies</a>` :
    `<a href="#${title}" class="main-navigation__item ${activeClass}">${title[0].toUpperCase() + title.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`;

  return template;
};

const createMenuTemplate = function (filters) {
  const filterMarkup =
  filters
  .map((filter, i) => createFilterTemplate(filter, i === 0))
  .join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${filterMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
  );
};

class Menu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
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

export default Menu;
