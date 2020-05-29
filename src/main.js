import ProfileComponent from './components/profile.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import StatisticComponent from './components/statistic.js';

import PageController from './controllers/page-controller.js';
import FiltersController from './controllers/filters-controller.js';

import FilmsModel from './models/films.js';
import CommentsModel from './models/comments.js';

import API from './api/api.js';
import Provider from './api/provider.js';
import Store from './api/store.js';

import {render} from './utils.js';

import {SCREEN_IDS} from './const.js';

const TOKEN = `Basic ok20kk292s2k2v99w09as255k29s`;

const STORAGE_PREFIX = `local-storage`;
const STORAGE_VERSION = `v1`;
const STORAGE_NAME = STORAGE_PREFIX + STORAGE_VERSION;

const PAGE_TITLE_OFFLINE = `[offline]`;

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
const storage = new Store(STORAGE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, storage);
const filmsModel = new FilmsModel();

const profileComponent = new ProfileComponent(header, filmsModel);
const filtersController = new FiltersController(main, filmsModel);
const statisticComponent = new StatisticComponent(main, filmsModel);
const pageController = new PageController(main, apiWithProvider, filmsModel, commentsModel);


apiWithProvider.getFilms()
.then((films) => {
  quantityOfFilms = films.length;
  filmsModel.setFilms(films);
})
.then(() => {
  filtersController.render();
  filtersController.setScreenChangeHandler(onScreenChange);

  profileComponent.render();

  statisticComponent.render();
  statisticComponent.hide();

  pageController.render();

  render(footer, new FooterStatisticComponent(quantityOfFilms));
})
.catch((err) => {
  filmsModel.setFilms([]);
  throw new Error(err);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`)
  .catch((err) => {
    throw new Error(err);
  });
});

window.addEventListener(`offline`, () => {
  document.title += ` ${PAGE_TITLE_OFFLINE}`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(PAGE_TITLE_OFFLINE, ``);
  apiWithProvider.sync();
});
