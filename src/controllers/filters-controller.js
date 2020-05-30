import MenuComponent from '../components/menu.js';
import {render, removeComponent} from '../utils.js';
import {FilterTypes, RenderMethods} from '../const.js';

const filters = {
  [FilterTypes.ALL]: {
    title: `All movies`,
    count: null,
  },
  [FilterTypes.WATCHLIST]: {
    title: `Watchlist`,
    count: null,
  },
  [FilterTypes.HISTORY]: {
    title: `History`,
    count: null,
  },
  [FilterTypes.FAVORITE]: {
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
    this._currentFilter = FilterTypes.ALL;

    this._onDataChange = this._onDataChange.bind(this);
    this._onChange = this._onChange.bind(this);

    this._screenChangeHandler = null;

    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  _update() {
    this._filters[FilterTypes.WATCHLIST].count = this._filmsModel.get(FilterTypes.WATCHLIST).length;
    this._filters[FilterTypes.FAVORITE].count = this._filmsModel.get(FilterTypes.FAVORITE).length;
    this._filters[FilterTypes.HISTORY].count = this._filmsModel.get(FilterTypes.HISTORY).length;
  }

  _onChange(newFilter) {
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
    this._update();

    this._menuComponent = new MenuComponent(this._filters, this._currentFilter);
    render(this._container, this._menuComponent, RenderMethods.PREPEND);

    this._menuComponent.setFilterHandler(this._onChange);
  }

  setScreenChangeHandler(cb) {
    this._screenChangeHandler = cb;
    this._menuComponent.setScreenChangeHandler(cb);
  }
}

export default FilterController;
