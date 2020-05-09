import MenuComponent from '../components/menu.js';
import {render, removeComponent} from '../utils.js';
import {FILTER_TYPES, RENDER_METHODS} from '../const.js';

const filters = {
  [FILTER_TYPES.ALL]: {
    title: `All movies`,
    count: null,
  },
  [FILTER_TYPES.WATCHLIST]: {
    title: `Watchlist`,
    count: null,
  },
  [FILTER_TYPES.HISTORY]: {
    title: `History`,
    count: null,
  },
  [FILTER_TYPES.FAVORITE]: {
    title: `Favorite`,
    count: null,
  },
};

class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filters = filters;

    this._menuComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _updateFilters() {
    this._filters[FILTER_TYPES.WATCHLIST].count = this._filmsModel.getFilms(FILTER_TYPES.WATCHLIST).length;
    this._filters[FILTER_TYPES.FAVORITE].count = this._filmsModel.getFilms(FILTER_TYPES.FAVORITE).length;
    this._filters[FILTER_TYPES.HISTORY].count = this._filmsModel.getFilms(FILTER_TYPES.HISTORY).length;
  }

  _onFilterChange(newFilter) {
    this._filmsModel.changeCurrentFilter(newFilter);
  }

  _onDataChange() {
    this.render();
  }

  render() {
    this._updateFilters();
    if (this._menuComponent) {
      removeComponent(this._menuComponent);
    }

    this._menuComponent = new MenuComponent(this._filters);
    render(this._container, this._menuComponent, RENDER_METHODS.PREPEND);
    this._menuComponent.setFilterHandler(this._onFilterChange);
    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  getFilters() {
    return this._filters;
  }
}

export default FilterController;
