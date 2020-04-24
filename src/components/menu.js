import AbstractComponent from './abstract-component.js';

const createFilterTemplate = (key, filter, isChecked) => {
  const {title, count} = filter;
  const activeClass = isChecked ? `main-navigation__item--active` : ``;

  return (
    `<a href="#${key}" class="main-navigation__item ${activeClass}">${title}
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
}

export default Menu;
