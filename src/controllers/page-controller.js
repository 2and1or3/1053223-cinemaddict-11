import LoadButtonComponent from '../components/load-button.js';
import SortComponent from '../components/sort.js';
import ContentContainerComponent from '../components/content-container.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/films-list.js';

import CardController from './card-controller.js';
import ExtraController from './extra-controller.js';

import {render, removeComponent} from '../utils.js';
import {SORT_TYPES} from '../components/sort.js';

const CARDS_STEP = 5;
const EXTRA_TYPES = {
  TOP: `Top rated`,
  MOST: `Most commented`,
};

const SORT_FUNCTIONS = {
  [SORT_TYPES.DATE]: (leftFilm, rightFilm) => rightFilm.date - leftFilm.date,
  [SORT_TYPES.RATING]: (leftFilm, rightFilm) => rightFilm.rating - leftFilm.rating,
};


class PageController {
  constructor(container, filmsModel, commentsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._visibleCards = 0;
    this._visibleCardControllers = [];

    this._contentContainerComponent = new ContentContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._loadButtonComponent = new LoadButtonComponent();
    this._sortComponent = new SortComponent();

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onCommentDelete = this._onCommentDelete.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
    this._loadButtonHandler = this._loadButtonHandler.bind(this);
    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  _loadMore(begin, end, currentFilms) {
    const difference = end - begin;
    this._visibleCards += difference;

    const newCardControllers =
      currentFilms
        .slice(begin, end)
        .map((film) => {
          const cardController =
          new CardController(this._filmsListComponent.getInnerContainer(),
              this._onDataChange,
              this._onViewChange,
              this._onCommentDelete,
              this._onCommentAdd);

          cardController.render(film, this._commentsModel.getComments(film.id));
          return cardController;
        });

    this._visibleCardControllers = this._visibleCardControllers.concat(newCardControllers);
  }

  _loadButtonHandler(evt) {
    evt.preventDefault();
    const addCardStep = () => this._visibleCards + CARDS_STEP;
    const films = this._filmsModel.getFilms();

    const isfilmsEnd = addCardStep() >= films.length;

    const currentEnd = isfilmsEnd ? films.length : addCardStep();

    const sortedFilms = this._getSortedFilms(this._sortComponent.getCurrentSort());

    this._loadMore(this._visibleCards, currentEnd, sortedFilms);

    if (isfilmsEnd) {
      removeComponent(this._loadButtonComponent);
    }
  }

  _sortClickHandler(newSortType) {
    this._repeatRender(newSortType);
  }

  _getSortedFilms(sortType) {
    const sorted = this._filmsModel.getFilms().slice(0);
    sorted.sort(SORT_FUNCTIONS[sortType]);

    return sorted;
  }

  _repeatRender(sortType) {
    const sortedFilms = this._getSortedFilms(sortType);
    this._clear();

    this._loadMore(this._visibleCards, CARDS_STEP, sortedFilms);
    this._renderLoadButton();
  }

  _clear() {
    this._filmsListComponent.getInnerContainer().innerHTML = ``;
    removeComponent(this._loadButtonComponent);
    this._visibleCards = 0;
    this._visibleCardControllers = [];
  }

  _updateCard(film) {
    const targetController = this._visibleCardControllers
                             .find((controller) => controller.getId() === film.id);

    targetController.updateRender(film, this._commentsModel.getComments(film.id));
  }

  _onDataChange(newFilm) {
    this._filmsModel.updateFilm(newFilm);

    this._updateCard(newFilm);
  }

  _onCommentDelete(film, commentIndex) {
    this._commentsModel.deleteComment(film.id, commentIndex);

    this._updateCard(film);
  }

  _onCommentAdd(film, newComment) {
    this._commentsModel.addComment(film.id, newComment);

    this._updateCard(film);
  }

  _onViewChange(evt) {
    this._visibleCardControllers
    .forEach((controller) => controller.setDefaultView(evt));
  }

  _onFilterChange() {
    this.resetCurrentSort();
  }

  _renderExtra() {
    const films = this._filmsModel.getAllFilms();

    const extraFilmsData = {
      [EXTRA_TYPES.TOP]: [films[0], films[1]],
      [EXTRA_TYPES.MOST]: [films[0], films[1]],
    };

    const extraCommentsModel = this._commentsModel;

    const extraFilmsTypes = Object.keys(extraFilmsData);

    extraFilmsTypes.forEach((filmsType) => {
      const extraFilms = extraFilmsData[filmsType];
      const extraController =
      new ExtraController(this._contentContainerComponent.getElement(),
          filmsType,
          extraCommentsModel,
          this._onDataChange,
          this._onViewChange);

      extraController.render(extraFilms);
    });
  }

  _renderLoadButton() {
    const currentFilms = this._filmsModel.getFilms();
    const isMoreThanStep = currentFilms.length > CARDS_STEP;

    if (isMoreThanStep) {
      render(this._filmsListComponent.getElement(), this._loadButtonComponent);
      this._loadButtonComponent.setLoadButtonClickHandler(this._loadButtonHandler);
    }
  }

  render() {
    const films = this._filmsModel.getFilms();
    const isEmptyData = !films.length;

    render(this._container, this._sortComponent);
    this._sortComponent.setSortClickHandler(this._sortClickHandler);

    render(this._container, this._contentContainerComponent);

    if (isEmptyData) {
      render(this._contentContainerComponent.getElement(), this._noFilmsComponent);
    } else {
      render(this._contentContainerComponent.getElement(), this._filmsListComponent);
      this._loadMore(this._visibleCards, CARDS_STEP, films);

      this._renderLoadButton();

      this._filmsModel.addFilterChangeHandler(this._onFilterChange);

      this._renderExtra();
    }
  }

  show() {
    this._contentContainerComponent.show();
    this._sortComponent.show();
  }

  hide() {
    this._contentContainerComponent.hide();
    this._sortComponent.hide();
  }

  resetCurrentSort() {
    this._repeatRender(SORT_TYPES.DEFAULT);
    this._sortComponent.resetCurrentSort();
  }
}

export default PageController;
