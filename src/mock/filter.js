// import {films} from './film.js';
// import {FILTER_TYPES} from '../const.js';
//
//
// const generateFilters = () => {
//   const filters = {
//     [FILTER_TYPES.ALL]: {
//       title: `All movies`,
//       count: null,
//     },
//     [FILTER_TYPES.WATCHLIST]: {
//       title: `Watchlist`,
//       count: null,
//     },
//     [FILTER_TYPES.HISTORY]: {
//       title: `History`,
//       count: null,
//     },
//     [FILTER_TYPES.FAVORITE]: {
//       title: `Favorite`,
//       count: null,
//     },
//   };
//
//   return filters;
// };
//
// const updateFilters = () => {
//   const filters = generateFilters();
//
//   films.forEach((card) => {
//     const {isWatchList, isFavorite, isWatched} = card;
//
//     if (isWatchList) {
//       filters[FILTER_TYPES.WATCHLIST].count++;
//     }
//
//     if (isFavorite) {
//       filters[FILTER_TYPES.HISTORY].count++;
//     }
//
//     if (isWatched) {
//       filters[FILTER_TYPES.FAVORITE].count++;
//     }
//
//   });
//
//   return filters;
// };
//
// export {generateFilters, updateFilters};
