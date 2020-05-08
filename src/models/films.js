import {FILTER_TYPES} from '../const.js';

const FILTER_FUNCTIONS = {
  [FILTER_TYPES.ALL]: () => true,
  [FILTER_TYPES.WATCHLIST]: (film) => film.isWatchList,
  [FILTER_TYPES.HISTORY]: (film) => film.isWatched,
  [FILTER_TYPES.FAVORITE]: (film) => film.isFavorite,
};

const getFilmsByFilter = (films, filterType) => {
  const filtered = films.filter(FILTER_FUNCTIONS[filterType]);

  return filtered;
};

class Films {
  constructor() {
    this._films = null;

    this._currentFilter = FILTER_TYPES.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getFilms(currentFilter = this._currentFilter) {
    return getFilmsByFilter(this._films, currentFilter);
  }

  getAllFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = films;
  }

  updateFilm(newFilm) {

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
