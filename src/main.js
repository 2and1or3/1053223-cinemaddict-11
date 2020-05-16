import ProfileComponent from './components/profile.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import StatisticComponent from './components/statistic.js';

import PageController from './controllers/page-controller.js';
import FiltersController from './controllers/filters-controller.js';

import FilmsModel from './models/films.js';
import CommentsModel from './models/comments.js';

import API from './api.js';

import {render} from './utils.js';

// import {filmsData} from './mock/film.js';
// import {generateComments} from './mock/comment.js';
import {FILTER_TYPES, SCREEN_IDS} from './const.js';

const TOKEN = `Basic ok20kk29s2k2v99w09ak29s`;

const onScreenChange = (screenId) => {
  switch (screenId) {
    case SCREEN_IDS.STATISTIC:
      pageController.hide();
      pageController.resetCurrentSort();
      statisticComponent.show();
      break;

    case SCREEN_IDS.CARDS:
      statisticComponent.hide();
      pageController.resetCurrentSort();
      pageController.show();
      break;
  }
};


const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

let quantityOfFilms;

const commentsModel = new CommentsModel();

const api = new API(TOKEN);
const filmsModel = new FilmsModel();
const filtersController = new FiltersController(main, filmsModel);
const statisticComponent = new StatisticComponent(main, filmsModel);
const pageController = new PageController(main, api, filmsModel, commentsModel);


api.getFilms()
.then((films) => {
  quantityOfFilms = films.length;
  filmsModel.setFilms(films);

  const promises = films.map((film) => api.getCommentsByFilmId(film.id));
  return promises;
})
.then((commentsPromises) => Promise.all(commentsPromises))
.then((comments) => {
  comments.forEach((comment, index) => commentsModel.setComments(comment, index));
})
.then(() => {
  filtersController.render();
  filtersController.setScreenChangeHandler(onScreenChange);

  const user = {count: filtersController.getFilters()[FILTER_TYPES.HISTORY].count};
  render(header, new ProfileComponent(user));

  statisticComponent.render();
  statisticComponent.hide();

  filmsModel.addDataChangeHandler(statisticComponent.rerender.bind(statisticComponent));

  pageController.render();

  render(footer, new FooterStatisticComponent(quantityOfFilms));
})
.catch((err) => {
  filmsModel.setFilms([]);
  throw new Error(err);
});
