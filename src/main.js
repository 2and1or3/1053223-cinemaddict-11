import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import FooterStatisticComponent from './components/footer-statistic.js';

import PageController from './controllers/page-controller.js';

import {render} from './utils.js';

import {filmsData} from './mock/film.js';
import {FILTER_TYPES} from './const.js';


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

const updateFilters = (films) => {
  films.forEach((film) => {
    const {isWatchList, isFavorite, isWatched} = film;

    if (isWatchList) {
      filters[FILTER_TYPES.WATCHLIST].count++;
    }

    if (isFavorite) {
      filters[FILTER_TYPES.FAVORITE].count++;
    }

    if (isWatched) {
      filters[FILTER_TYPES.HISTORY].count++;
    }

  });
};

updateFilters(filmsData);

const quantityOfFilms = filmsData.length;

const user = {count: filters[FILTER_TYPES.HISTORY].count};
const header = document.querySelector(`.header`);
render(header, new ProfileComponent(user));

const main = document.querySelector(`.main`);
render(main, new MenuComponent(filters));


const pageController = new PageController(main);
pageController.render(filmsData);


const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticComponent(quantityOfFilms));
