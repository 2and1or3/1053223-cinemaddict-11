import LoadButtonComponent from '../components/load-button.js';
import SortComponent from '../components/sort.js';
import ContentContainerComponent from '../components/content-container.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import LoadingComponent from '../components/loading.js';
import FilmsExtraComponent from '../components/films-extra.js';

import CardController from './card-controller.js';

import {render, removeComponent, replace} from '../utils.js';
import {SORT_TYPES} from '../components/sort.js';

const CARDS_STEP = 5;
const EXTRA_TYPES = {
  TOP: `Top rated`,
  MOST: `Most commented`,
};

const SORT_FUNCTIONS = {
  [SORT_TYPES.DATE]: (leftFilm, rightFilm) => new Date(rightFilm.date) - new Date(leftFilm.date),
  [SORT_TYPES.RATING]: (leftFilm, rightFilm) => rightFilm.rating - leftFilm.rating,
  [SORT_TYPES.COMMENT]: (leftFilm, rightFilm) => rightFilm.comments.length - leftFilm.comments.length,
};

const COMMENT_FORM_ACTIVE = {
  ON: false,
  OFF: true,
};

const QUANTITY_EXTRA_CARDS = 2;

class PageController {
  constructor(container, api, filmsModel, commentsModel) {
    this._container = container;
    this._api = api;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._visibleCards = 0;
    this._visibleCardControllers = [];
    this._rateCardControllers = [];
    this._commentCardControllers = [];

    this._contentContainerComponent = new ContentContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._loadButtonComponent = new LoadButtonComponent();
    this._sortComponent = new SortComponent();
    this._loadingComponent = new LoadingComponent();
    this._filmsExtraComponentRate = null;
    this._filmsExtraComponentComment = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onCommentDelete = this._onCommentDelete.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
    this._loadButtonHandler = this._loadButtonHandler.bind(this);
    this._sortClickHandler = this._sortClickHandler.bind(this);

    this._renderLoading();
  }

  _renderLoading() {
    render(this._container, this._sortComponent);
    this._sortComponent.setSortClickHandler(this._sortClickHandler);

    render(this._container, this._contentContainerComponent);
    render(this._contentContainerComponent.getElement(), this._loadingComponent);
  }

  _getCardControllers(container, films) {
    const controllers =
      films
        .map((film) => {
          const cardController =
          new CardController(container,
              film,
              this._api,
              this._commentsModel,
              this._onDataChange,
              this._onViewChange,
              this._onCommentDelete,
              this._onCommentAdd);

          cardController.render(film);
          return cardController;
        });

    return controllers;
  }

  _loadMore(begin, end, currentFilms) {
    const difference = end - begin;
    this._visibleCards += difference;

    const container = this._filmsListComponent.getInnerContainer();
    currentFilms = currentFilms.slice(begin, end);

    const newCardControllers = this._getCardControllers(container, currentFilms);

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

    const isEmptyData = !sortedFilms.length;

    if (isEmptyData) {
      replace(this._noFilmsComponent, this._filmsListComponent);
    } else {

      if (this._container.contains(this._noFilmsComponent.getElement())) {
        replace(this._filmsListComponent, this._noFilmsComponent);
      }

      this._loadMore(this._visibleCards, CARDS_STEP, sortedFilms);
      this._renderLoadButton();
    }
  }

  _clear() {
    this._filmsListComponent.getInnerContainer().innerHTML = ``;
    removeComponent(this._loadButtonComponent);
    this._visibleCards = 0;
    this._visibleCardControllers = [];
  }

  _onDataChange(newFilm) {
    const targetController =
      this._visibleCardControllers
        .concat(this._rateCardControllers)
        .concat(this._commentCardControllers)
        .find((controller) => controller.getId() === newFilm.id);

    this._api.updateFilm(newFilm)
    .then((film) => {
      this._filmsModel.updateFilm(film);

      targetController.updateRender(film);

      this._repeatRender(this._sortComponent.getCurrentSort());
      this._renderExtra();
    })
    .catch((err) => {
      throw new Error(err);
    });
  }

  _onCommentDelete(film, commentIndex) {
    const commentId = film.comments[commentIndex];
    const targetControllers =
      this._visibleCardControllers
        .concat(this._rateCardControllers)
        .concat(this._commentCardControllers)
        .filter((controller) => controller.getId() === film.id);

    this._api.deleteComment(commentId)
      .then(() => {
        this._commentsModel.deleteComment(film.id, commentIndex);

        film.comments.splice(commentIndex, 1);

        targetControllers.forEach((controller) => {
          controller.updateRender(film);
        });

        this._renderExtra();
      })
      .catch(() => {
        targetControllers.forEach((controller) => {
          controller.shakeComment(commentIndex);
        });
      });
  }

  _onCommentAdd(film, newComment) {
    const targetControllers =
      this._visibleCardControllers
        .concat(this._rateCardControllers)
        .concat(this._commentCardControllers)
        .filter((controller) => controller.getId() === film.id);

    this._api.addComment(film.id, newComment)
      .then((localObj) => {

        this._filmsModel.updateFilm(localObj.movie);
        this._commentsModel.setComments(localObj.comments, film.id);

        targetControllers.forEach((controller) => {
          controller.updateRender(localObj.movie);
        });
        this._renderExtra();
      })
      .catch(() => {
        targetControllers.forEach((controller) => {
          controller.toggleCommentForm(COMMENT_FORM_ACTIVE.ON);
        });
      });
  }

  _onViewChange(evt) {
    this._visibleCardControllers
      .concat(this._rateCardControllers)
      .concat(this._commentCardControllers)
      .forEach((controller) => controller.setDefaultView(evt));
  }

  _onFilterChange() {
    this.resetCurrentSort();
  }

  _renderExtra() {
    const films = this._filmsModel.getAllFilms().slice();

    let topRateFilms = films.slice();
    let topCommentFilms = films.slice();

    topRateFilms.sort(SORT_FUNCTIONS[SORT_TYPES.RATING]);
    topCommentFilms.sort(SORT_FUNCTIONS[SORT_TYPES.COMMENT]);

    topRateFilms = topRateFilms.slice(0, QUANTITY_EXTRA_CARDS);
    topCommentFilms = topCommentFilms.slice(0, QUANTITY_EXTRA_CARDS);


    const maxRating = topRateFilms[0].rating;
    const maxCommentsLength = topCommentFilms[0].comments.length;

    if (!(this._filmsExtraComponentRate || this._filmsExtraComponentComment)) {
      this._filmsExtraComponentRate = new FilmsExtraComponent(EXTRA_TYPES.TOP);
      this._filmsExtraComponentComment = new FilmsExtraComponent(EXTRA_TYPES.MOST);

      if (maxRating) {
        render(this._contentContainerComponent.getElement(), this._filmsExtraComponentRate);
      }

      if (maxCommentsLength) {
        render(this._contentContainerComponent.getElement(), this._filmsExtraComponentComment);
      }
    }

    this._extraControllersHandler(topRateFilms, this._rateCardControllers, this._filmsExtraComponentRate.getInnerContainer());
    this._extraControllersHandler(topCommentFilms, this._commentCardControllers, this._filmsExtraComponentComment.getInnerContainer());
  }

  _extraControllersHandler(extraFilms, controllers, container) {
    for (let i = 0; i < extraFilms.length; i++) {
      const film = extraFilms[i];
      const controller = controllers[i];

      if (controller) {
        const isEqual = film.id === controller.getId();

        if (!isEqual) {
          controllers[i].destroy();
          const [newController] = this._getCardControllers(container, [film]);
          controllers[i] = newController;
        }

      } else {
        const [newController] = this._getCardControllers(container, [film]);
        controllers.push(newController);
      }
    }
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

    if (isEmptyData) {
      replace(this._noFilmsComponent, this._loadingComponent);
    } else {
      replace(this._filmsListComponent, this._loadingComponent);
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
