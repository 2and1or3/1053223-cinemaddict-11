import ProfileComponent from './components/profile.js';
import FooterStatisticComponent from './components/footer-statistic.js';

import PageController from './controllers/page-controller.js';
import FiltersController from './controllers/filters-controller.js';

import FilmsModel from './models/films.js';
import CommentsModel from './models/comments.js';

import {render, getRandomInteger} from './utils.js';

import {filmsData} from './mock/film.js';
import {generateComments} from './mock/comment.js';
import {FILTER_TYPES} from './const.js';

const COMMENTS_LIMIT = 5;


const quantityOfFilms = filmsData.length;

const commentsModel = new CommentsModel();
for (let i = 0; i < quantityOfFilms; i++) {
  const comments = generateComments(getRandomInteger(0, COMMENTS_LIMIT));
  commentsModel.setComments(comments, i);
}


const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const filtersController = new FiltersController(main, filmsModel);
filtersController.render();


const user = {count: filtersController.getFilters()[FILTER_TYPES.HISTORY].count};
render(header, new ProfileComponent(user));

const pageController = new PageController(main, filmsModel, commentsModel);
pageController.render();


const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticComponent(quantityOfFilms));
