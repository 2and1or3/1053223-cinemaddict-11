import {films} from './film.js';
import {FILTER_TYPES} from '../const.js';


const updateFilters = () => {
  const menuCounter = {
    [FILTER_TYPES.ALL]: null,
    [FILTER_TYPES.WATCHLIST]: 0,
    [FILTER_TYPES.HISTORY]: 0,
    [FILTER_TYPES.FAVORITE]: 0,
  };

  films.forEach((card) => {

    const {isWatchList, isFavorite, isWatched} = card;

    if (isWatchList) {
      menuCounter[FILTER_TYPES.WATCHLIST]++;
    }

    if (isFavorite) {
      menuCounter[FILTER_TYPES.HISTORY]++;
    }

    if (isWatched) {
      menuCounter[FILTER_TYPES.FAVORITE]++;
    }

  });

  return menuCounter;
};

const generateFilters = () => {
  const menuCounter = updateFilters();
  const filters = [];
  const filterEntries = Object.entries(menuCounter);

  for (const filter of filterEntries) {
    const [title, count] = filter;

    filters.push({title, count});
  }

  return filters;
};

export {generateFilters, updateFilters};
