import AbstractComponent from './abstract-component.js';

const SORT_TYPES = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
  COMMENT: `comment`,
};

const ACTIVE_SORT_CLASS = `sort__button--active`;

const createSortTemplate = function () {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button ${ACTIVE_SORT_CLASS}" data-sort-type="${SORT_TYPES.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPES.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPES.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSort = SORT_TYPES.DEFAULT;
  }

  _toggleActiveClass(sortType) {
    const currentControl = this.getElement().querySelector(`.${ACTIVE_SORT_CLASS}`);
    currentControl.classList.remove(`${ACTIVE_SORT_CLASS}`);

    const targetControl = this.getElement().querySelector(`a[data-sort-type=${sortType}]`);
    targetControl.classList.add(`${ACTIVE_SORT_CLASS}`);
  }

  getTemplate() {
    return createSortTemplate();
  }

  getCurrentSort() {
    return this._currentSort;
  }

  setSortClickHandler(cb) {
    this.getElement().addEventListener(`click`, (evt) => {
      const isLink = evt.target.tagName === `A`;
      const isActive = this._currentSort === evt.target.dataset.sortType;

      if (isLink && !isActive) {
        const sortType = evt.target.dataset.sortType;
        this._currentSort = sortType;
        this._toggleActiveClass(this._currentSort);
        cb(this._currentSort);
      }
    });
  }

  resetCurrentSort() {
    this._currentSort = SORT_TYPES.DEFAULT;
    this._toggleActiveClass(this._currentSort);
  }
}

export default Sort;
export {SORT_TYPES};
