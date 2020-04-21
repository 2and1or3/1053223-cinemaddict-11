import FilmsExtraComponent from './components/films-extra.js';
import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import CardComponent from './components/card.js';
import LoadButtonComponent from './components/load-button.js';
import DetailsComponent from './components/details-popup.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import ContentContainerComponent from './components/content-container.js';
import FilmsListComponent from './components/films-list.js';
import NoFilmsComponent from './components/no-films.js';

import {render} from './utils.js';

import {filmsData} from './mock/film.js';
import {FILTER_TYPES} from './const.js';

const CARDS_STEP = 5;
// const TOP_CARD_COUNT = 2;
// const MOST_CARD_COUNT = 2;
const PRESS_KEY = {
  ESC: 27,
};

const isEscPress = (evt) => evt.keyCode === PRESS_KEY.ESC;

const EXTRA_TYPES = {
  TOP: `Top rated`,
  MOST: `Most commented`,
};

const extraFilmsData = {
  [EXTRA_TYPES.TOP]: [filmsData[0], filmsData[1]],
  [EXTRA_TYPES.MOST]: [filmsData[0], filmsData[1]],
};

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

const isEmptyData = () => !quantityOfFilms;

const user = {count: filters[FILTER_TYPES.HISTORY].count};
const header = document.querySelector(`.header`);
render(header, new ProfileComponent(user).getElement());

const main = document.querySelector(`.main`);
render(main, new MenuComponent(filters).getElement());
render(main, new SortComponent().getElement());


const renderCard = (container, film) => {
  const cardComponent = new CardComponent(film);
  render(container, cardComponent.getElement());

  const onEscPress = (evt) => {
    evt.preventDefault();
    if (isEscPress) {
      closePopup(evt);
    }
  };

  const openPopup = (evt) => {
    evt.preventDefault();
    detailsContainer.append(detailsComponent.getElement());
    closeDetails.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onEscPress);
  };

  const closePopup = (evt) => {
    evt.preventDefault();
    detailsComponent.getElement().remove();
    document.removeEventListener(`keydown`, onEscPress);
  };

  const addListeners = (cb, ...controls) => {
    controls.forEach((control) => control.addEventListener(`click`, cb));
  };

  const poster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const title = cardComponent.getElement().querySelector(`.film-card__title`);
  const comment = cardComponent.getElement().querySelector(`.film-card__comments`);
  addListeners(openPopup, poster, title, comment);

  const detailsComponent = new DetailsComponent(film);
  const closeDetails = detailsComponent.getElement().querySelector(`.film-details__close-btn`);
  const detailsContainer = document.querySelector(`.films`);
};

const renderExtraFilms = (container, title, films) => {
  const filmsExtraComponent = new FilmsExtraComponent(title);
  render(container, filmsExtraComponent.getElement());

  const filmsList = filmsExtraComponent.getElement().querySelector(`.films-list__container`);

  films.forEach((film) => renderCard(filmsList, film));
};

const renderContent = (container, films) => {
  const contentContainerComponent = new ContentContainerComponent();
  render(container, contentContainerComponent.getElement());

  if (isEmptyData()) {
    const noFilmsComponent = new NoFilmsComponent();
    render(contentContainerComponent.getElement(), noFilmsComponent.getElement());
  } else {

    const filmsListComponent = new FilmsListComponent();
    render(contentContainerComponent.getElement(), filmsListComponent.getElement());
    const filmList = filmsListComponent.getElement().querySelector(`.films-list__container`);

    let visibleCards = 0;
    let addCardStep = () => visibleCards + CARDS_STEP;

    const loadMore = (begin, end) => {
      films
        .slice(begin, end)
        .forEach((film) => renderCard(filmList, film));

      const difference = end - begin;
      visibleCards += difference;
    };

    loadMore(visibleCards, CARDS_STEP);

    const onLoadClick = (evt) => {
      evt.preventDefault();

      const isfilmsEnd = addCardStep() >= quantityOfFilms;

      const currentEnd = isfilmsEnd ? quantityOfFilms : addCardStep();

      loadMore(visibleCards, currentEnd);

      if (isfilmsEnd) {
        loadButtonComponent.getElement().remove();
        loadButtonComponent.removeElement();
      }
    };

    const loadButtonComponent = new LoadButtonComponent();
    render(contentContainerComponent.getElement(), loadButtonComponent.getElement());

    loadButtonComponent.getElement().addEventListener(`click`, onLoadClick);


    const extraFilmsTypes = Object.keys(extraFilmsData);

    extraFilmsTypes.forEach((filmsType) => {
      const extraFilms = extraFilmsData[filmsType];
      renderExtraFilms(contentContainerComponent.getElement(), filmsType, extraFilms);
    });
  }
};

renderContent(main, filmsData);

const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticComponent(quantityOfFilms).getElement());
