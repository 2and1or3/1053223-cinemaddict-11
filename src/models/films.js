import {FilterTypes} from '../const.js';

const FILTER_FUNCTIONS = {
  [FilterTypes.ALL]: () => true,
  [FilterTypes.WATCHLIST]: (film) => film.isWatchList,
  [FilterTypes.HISTORY]: (film) => film.isWatched,
  [FilterTypes.FAVORITE]: (film) => film.isFavorite,
};

const getFilmsByFilter = (films, filterType) => {
  const filtered = films.filter(FILTER_FUNCTIONS[filterType]);

  return filtered;
};

class Films {
  constructor() {
    this._films = null;

    this._currentFilter = FilterTypes.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  get(currentFilter = this._currentFilter) {
    return getFilmsByFilter(this._films, currentFilter);
  }

  getAll() {
    return this._films;
  }

  set(films) {
    this._films = films;
  }

  update(newFilm) {
    this._films[newFilm.id] = newFilm;

    this._callHandlers(this._dataChangeHandlers);
  }

  changeCurrentFilter(newFilter) {
    this._currentFilter = newFilter;
    this._callHandlers(this._filterChangeHandlers);
  }

  addDataChangeHandler(cb) {
    this._dataChangeHandlers.push(cb);
  }

  addFilterChangeHandler(cb) {
    this._filterChangeHandlers.push(cb);
  }
}

export default Films;
