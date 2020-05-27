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
    this._currentFilter = FILTER_TYPES.ALL;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._screenChangeHandler = null;
  }

  _updateFilters() {
    this._filters[FILTER_TYPES.WATCHLIST].count = this._filmsModel.getFilms(FILTER_TYPES.WATCHLIST).length;
    this._filters[FILTER_TYPES.FAVORITE].count = this._filmsModel.getFilms(FILTER_TYPES.FAVORITE).length;
    this._filters[FILTER_TYPES.HISTORY].count = this._filmsModel.getFilms(FILTER_TYPES.HISTORY).length;
  }

  _onFilterChange(newFilter) {
    this._currentFilter = newFilter;
    this._filmsModel.changeCurrentFilter(newFilter);
  }

  _onDataChange() {
    this._rerender();
  }

  _rerender() {
    removeComponent(this._menuComponent);
    this.render();
    this._menuComponent.setScreenChangeHandler(this._screenChangeHandler);
  }

  render() {
    this._updateFilters();

    this._menuComponent = new MenuComponent(this._filters, this._currentFilter);
    render(this._container, this._menuComponent, RENDER_METHODS.PREPEND);

    this._menuComponent.setFilterHandler(this._onFilterChange);
    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  getFilters() {
    return this._filters;
  }

  setScreenChangeHandler(cb) {
    this._screenChangeHandler = cb;
    this._menuComponent.setScreenChangeHandler(cb);
  }
}

export default FilterController;
