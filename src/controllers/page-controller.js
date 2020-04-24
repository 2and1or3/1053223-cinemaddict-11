import LoadButtonComponent from '../components/load-button.js';
import SortComponent from '../components/sort.js';
import ContentContainerComponent from '../components/content-container.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/films-list.js';

import CardController from './card-controller.js';
import ExtraController from './extra-controller.js';

import {render, removeComponent} from '../utils.js';
import {SORT_TYPES} from '../components/sort.js';
import {RENDER_METHODS} from '../const.js';

const CARDS_STEP = 5;
const EXTRA_TYPES = {
  TOP: `Top rated`,
  MOST: `Most commented`,
};

const SORT_FUNCTIONS = {
  [SORT_TYPES.DATE]: (leftFilm, rightFilm) => leftFilm.date - rightFilm.date,
  [SORT_TYPES.RATING]: (leftFilm, rightFilm) => leftFilm.rating - rightFilm.rating,
};


class PageController {
  constructor(container) {
    this._container = container;
    this._films = null;
    this._filmsToRender = null;
    this._visibleCards = 0;
    this._contentContainerComponent = new ContentContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._loadButtonComponent = new LoadButtonComponent();
    this._sortComponent = new SortComponent();
  }

  loadMore(begin, end) {
    this._filmsToRender
        .slice(begin, end)
        .forEach((film) => {
          const cardController = new CardController(this._filmsListComponent.getInnerContainer());
          cardController.render(film);
        });

    const difference = end - begin;
    this._visibleCards += difference;
  }

  loadButtonHandler(evt) {
    evt.preventDefault();
    const addCardStep = () => this._visibleCards + CARDS_STEP;
    const isfilmsEnd = addCardStep() >= this._films.length;

    const currentEnd = isfilmsEnd ? this._films.length : addCardStep();

    this.loadMore(this._visibleCards, currentEnd);

    if (isfilmsEnd) {
      removeComponent(this._loadButtonComponent);
    }
  }

  sortClickHandler(evt) {
    const oldSortType = this._sortComponent.getCurrentSort();
    this._sortComponent.setCurrentSort(evt);
    const newSortType = this._sortComponent.getCurrentSort();

    const isChanged = oldSortType !== newSortType;

    if (isChanged) {
      this.repeatRender(newSortType);
    }
  }

  getSortedFilms(sortType) {
    const sorted = this._films.slice(0);
    sorted.sort(SORT_FUNCTIONS[sortType]);

    return sorted;
  }

  repeatRender(sortType) {
    const sortedFilms = this.getSortedFilms(sortType);
    this._filmsToRender = sortedFilms;
    this.clear();
    this._visibleCards = 0;

    this.loadMore(this._visibleCards, CARDS_STEP);
    render(this._filmsListComponent.getElement(), this._loadButtonComponent, RENDER_METHODS.AFTER);
    this._loadButtonComponent.setClickHandler(this.loadButtonHandler.bind(this));
  }

  clear() {
    this._filmsListComponent.getInnerContainer().innerHTML = ``;
    removeComponent(this._loadButtonComponent);
  }

  render(films) {
    this._films = films;
    this._filmsToRender = this._films;
    const isEmptyData = !this._films.length;
    const extraFilmsData = {
      [EXTRA_TYPES.TOP]: [this._films[0], this._films[1]],
      [EXTRA_TYPES.MOST]: [this._films[0], this._films[1]],
    };

    render(this._container, this._sortComponent);
    this._sortComponent.setClickHandler(this.sortClickHandler.bind(this));

    render(this._container, this._contentContainerComponent);

    if (isEmptyData) {
      render(this._contentContainerComponent.getElement(), this._noFilmsComponent);
    } else {

      render(this._contentContainerComponent.getElement(), this._filmsListComponent);
      this.loadMore(this._visibleCards, CARDS_STEP);
      render(this._contentContainerComponent.getElement(), this._loadButtonComponent);
      this._loadButtonComponent.setClickHandler(this.loadButtonHandler.bind(this));


      const extraFilmsTypes = Object.keys(extraFilmsData);

      extraFilmsTypes.forEach((filmsType) => {
        const extraFilms = extraFilmsData[filmsType];
        const extraController = new ExtraController(this._contentContainerComponent.getElement(), filmsType);
        extraController.render(extraFilms);
      });
    }
  }
}

export default PageController;
