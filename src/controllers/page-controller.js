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
    this._visibleCards = 0;
    this._visibleCardControllers = [];
    this._contentContainerComponent = new ContentContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._loadButtonComponent = new LoadButtonComponent();
    this._sortComponent = new SortComponent();
  }

  _loadMore(begin, end, currentFilms) {
    const difference = end - begin;
    this._visibleCards += difference;

    const newCardControllers =
      currentFilms
        .slice(begin, end)
        .map((film) => {
          const cardController = new CardController(this._filmsListComponent.getInnerContainer(), this._onDataChange.bind(this), this._onViewChange.bind(this));
          cardController.render(film);
          return cardController;
        });

    this._visibleCardControllers = this._visibleCardControllers.concat(newCardControllers);
  }

  _loadButtonHandler(evt) {
    evt.preventDefault();
    const addCardStep = () => this._visibleCards + CARDS_STEP;
    const isfilmsEnd = addCardStep() >= this._films.length;

    const currentEnd = isfilmsEnd ? this._films.length : addCardStep();

    const sortedFilms = this._getSortedFilms(this._sortComponent.getCurrentSort());

    this._loadMore(this._visibleCards, currentEnd, sortedFilms);

    if (isfilmsEnd) {
      removeComponent(this._loadButtonComponent);
    }
  }

  _sortClickHandler(evt) {
    const oldSortType = this._sortComponent.getCurrentSort();
    this._sortComponent.setCurrentSort(evt);
    const newSortType = this._sortComponent.getCurrentSort();

    const isChanged = oldSortType !== newSortType;

    if (isChanged) {
      this._repeatRender(newSortType);
    }
  }

  _getSortedFilms(sortType) {
    const sorted = this._films.slice(0);
    sorted.sort(SORT_FUNCTIONS[sortType]);

    return sorted;
  }

  _repeatRender(sortType) {
    const sortedFilms = this._getSortedFilms(sortType);
    this._clear();

    this._loadMore(this._visibleCards, CARDS_STEP, sortedFilms);
    render(this._filmsListComponent.getElement(), this._loadButtonComponent, RENDER_METHODS.AFTER);
    this._loadButtonComponent.setClickHandler(this._loadButtonHandler.bind(this));
  }

  _clear() {
    this._filmsListComponent.getInnerContainer().innerHTML = ``;
    removeComponent(this._loadButtonComponent);
    this._visibleCards = 0;
    this._visibleCardControllers = [];
  }

  _onDataChange(newFilm) {
    const controllerIndex = this._visibleCardControllers.findIndex((controller) => controller.getId() === newFilm._innerId);
    this._films[newFilm._innerId] = newFilm;
    this._visibleCardControllers[controllerIndex].updateRender(this._films[newFilm._innerId]);
  }

  _onViewChange(evt) {
    this._visibleCardControllers.forEach((controller) => controller.setDefaultView(evt));
  }

  _renderExtra() {
    const extraFilmsData = {
      [EXTRA_TYPES.TOP]: [this._films[0], this._films[1]],
      [EXTRA_TYPES.MOST]: [this._films[0], this._films[1]],
    };

    const extraFilmsTypes = Object.keys(extraFilmsData);

    extraFilmsTypes.forEach((filmsType) => {
      const extraFilms = extraFilmsData[filmsType];
      const extraController = new ExtraController(this._contentContainerComponent.getElement(), filmsType, this._onDataChange.bind(this), this._onViewChange.bind(this));
      extraController.render(extraFilms);
    });
  }

  render(films) {
    this._films = films.map((film, index) => {
      film._innerId = index;
      return film;
    });

    const isEmptyData = !this._films.length;

    render(this._container, this._sortComponent);
    this._sortComponent.setClickHandler(this._sortClickHandler.bind(this));

    render(this._container, this._contentContainerComponent);

    if (isEmptyData) {
      render(this._contentContainerComponent.getElement(), this._noFilmsComponent);
    } else {
      render(this._contentContainerComponent.getElement(), this._filmsListComponent);
      this._loadMore(this._visibleCards, CARDS_STEP, this._films);
      render(this._contentContainerComponent.getElement(), this._loadButtonComponent);
      this._loadButtonComponent.setClickHandler(this._loadButtonHandler.bind(this));

      this._renderExtra();
    }
  }
}

export default PageController;
