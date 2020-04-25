import AbstractComponent from './abstract-component.js';

const SORT_TYPES = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
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

  getTemplate() {
    return createSortTemplate();
  }

  toggleActiveClass(evt) {
    const currentControl = this.getElement().querySelector(`.${ACTIVE_SORT_CLASS}`);
    currentControl.classList.remove(`${ACTIVE_SORT_CLASS}`);
    evt.target.classList.add(`${ACTIVE_SORT_CLASS}`);
  }

  getCurrentSort() {
    return this._currentSort;
  }

  setCurrentSort(evt) {
    const isLink = evt.target.tagName === `A`;


    if (isLink) {
      this.toggleActiveClass(evt);
      const sortType = evt.target.dataset.sortType;
      this._currentSort = sortType;
    }
  }

  setClickHandler(cb) {
    this.getElement().addEventListener(`click`, cb);
  }
}

export default Sort;
export {SORT_TYPES};
