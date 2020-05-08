import AbstractComponent from './abstract-component.js';

const ACTIVE_CLASS = `main-navigation__item--active`;

const createFilterTemplate = (key, filter, isChecked) => {
  const {title, count} = filter;
  const activeClass = isChecked ? ACTIVE_CLASS : ``;

  return (
    `<a href="#${key}" class="main-navigation__item ${activeClass}" data-id=${key}>${title}
      ${!count ? `` : `<span class="main-navigation__item-count">${+count}</span>`}
    </a>`
  );
};

const createMenuTemplate = function (filters) {
  const filtersKeys = Object.keys(filters);

  const filterMarkup =
  filtersKeys
  .map((key, i) => createFilterTemplate(key, filters[key], i === 0))
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

class Menu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  setFilterHandler(cb) {
    const container = this.getElement().querySelector(`.main-navigation__items`);
    container.addEventListener(`click`, (evt) => {

      const isLink = evt.target.tagName === `A`;
      const isActive = evt.target.classList.contains(ACTIVE_CLASS);

      if (isLink && !isActive) {
        const oldActive = this.getElement().querySelector(`.${ACTIVE_CLASS}`);
        oldActive.classList.remove(ACTIVE_CLASS);
        evt.target.classList.add(ACTIVE_CLASS);


        // console.log(evt.target.dataset.id);
        cb(evt.target.dataset.id);
      }
    });
  }
}

export default Menu;
