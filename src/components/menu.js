import AbstractComponent from './abstract-component.js';

import {SCREEN_IDS} from '../const.js';

const ACTIVE_CLASS = `main-navigation__item--active`;
const STATISTIC_CLASS = `main-navigation__additional`;

const isLink = (evt) => evt.target.tagName === `A`;

const createFilterTemplate = (key, filter, isChecked) => {
  const {title, count} = filter;
  const activeClass = isChecked ? ACTIVE_CLASS : ``;

  return (
    `<a href="#${key}" class="main-navigation__item ${activeClass}" data-id=${key}>${title}
      ${!count ? `` : `<span class="main-navigation__item-count">${+count}</span>`}
    </a>`
  );
};

const createMenuTemplate = function (filters, currentFilter) {
  const filtersKeys = Object.keys(filters);

  const filterMarkup =
  filtersKeys
  .map((key) => createFilterTemplate(key, filters[key], key === currentFilter))
  .join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${filterMarkup}
        </div>
        <a href="#stats" class="${STATISTIC_CLASS}">Stats</a>
      </nav>`
  );
};

class Menu extends AbstractComponent {
  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  setFilterHandler(cb) {
    const container = this.getElement().querySelector(`.main-navigation__items`);
    container.addEventListener(`click`, (evt) => {

      const isActive = evt.target.classList.contains(ACTIVE_CLASS);

      if (isLink(evt) && !isActive) {
        const oldActive = this.getElement().querySelector(`.${ACTIVE_CLASS}`);
        oldActive.classList.remove(ACTIVE_CLASS);
        evt.target.classList.add(ACTIVE_CLASS);

        cb(evt.target.dataset.id);
      }
    });
  }

  setScreenChangeHandler(cb) {
    const container = this.getElement();

    container.addEventListener(`click`, (evt) => {

      if (isLink(evt)) {
        const isStatistic = evt.target.classList.contains(STATISTIC_CLASS);

        if (isStatistic) {
          cb(SCREEN_IDS.STATISTIC);
        } else {
          cb(SCREEN_IDS.CARDS);
        }
      }
    });
  }
}

export default Menu;
