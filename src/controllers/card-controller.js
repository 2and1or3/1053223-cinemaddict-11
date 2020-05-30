import CardComponent from '../components/card.js';
import DetailsComponent from '../components/details.js';

import {render, isEscPress, removeComponent} from '../utils.js';

const FilmProperties = {
  IS_WATCHLIST: `isWatchList`,
  IS_FAVORITE: `isFavorite`,
  IS_WATCHED: `isWatched`,
};


class CardController {
  constructor(container, film, api, commentsModel, onDataChange, onViewChange, onCommentDelete, onCommentAdd) {
    this._container = container;
    this._api = api;
    this._commentsModel = commentsModel;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentDelete = onCommentDelete;
    this._onCommentAdd = onCommentAdd;

    this._cardComponent = null;
    this._detailsComponent = null;
    this._film = film;

    this._onEscPress = this._onEscPress.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._openPopup = this._openPopup.bind(this);
  }

  _onEscPress(evt) {
    if (isEscPress(evt)) {
      this._closePopup(evt);
    }
  }

  _openPopup(evt) {
    evt.preventDefault();
    this._onViewChange(evt);

    this._api.getCommentsByFilmId(this._film.id)
    .then((comments) => {

      this._commentsModel.setComments(comments, this._film.id);

      this._initDetails(comments);
    })
    .catch((err) => {
      throw new Error(err);
    });
  }

  _initDetails(comments) {
    this._detailsComponent = new DetailsComponent(this._film, comments);

    this._detailsComponent.show();

    document.addEventListener(`keydown`, this._onEscPress);
    this._recoveryDetailsListeners();
  }

  _closePopup(evt) {
    evt.preventDefault();
    if (this._detailsComponent) {
      this._detailsComponent.hide();
      document.removeEventListener(`keydown`, this._onEscPress);
      this._detailsComponent = null;
    }
  }

  _changeFilmState(property) {
    const changedFilm = {[property]: !this._film[property]};

    if (property === FilmProperties.IS_WATCHED) {
      changedFilm.watchDate = this._film.watchDate ? null : new Date();
    }

    const newFilm = Object.assign({}, this._film, changedFilm);
    this._onDataChange(newFilm);
  }

  _recoveryListeners() {
    this._cardComponent.setOpenClickHandlers(this._openPopup);
    this._cardComponent.setWatchListClickHandler(() => this._changeFilmState(FilmProperties.IS_WATCHLIST));
    this._cardComponent.setHistoryClickHandler(() => this._changeFilmState(FilmProperties.IS_WATCHED));
    this._cardComponent.setFavoriteClickHandler(() => this._changeFilmState(FilmProperties.IS_FAVORITE));
  }

  _recoveryDetailsListeners() {
    this._detailsComponent.setWatchListClickHandler(() => this._changeFilmState(FilmProperties.IS_WATCHLIST));
    this._detailsComponent.setHistoryClickHandler(() => this._changeFilmState(FilmProperties.IS_WATCHED));
    this._detailsComponent.setFavoriteClickHandler(() => this._changeFilmState(FilmProperties.IS_FAVORITE));

    this._detailsComponent.setDeleteCommentsHandler(this._onCommentDelete);
    this._detailsComponent.setAddCommentHandler(this._onCommentAdd);
    this._detailsComponent.setCloseClickHandler(this._closePopup);
  }

  render() {
    this._cardComponent = new CardComponent(this._film);

    render(this._container, this._cardComponent);

    this._recoveryListeners();
  }

  updateRender(film) {
    this._film = film;

    this._cardComponent.rerender(this._film);
    this._recoveryListeners();

    if (this._detailsComponent) {
      this._api.getCommentsByFilmId(this._film.id)
      .then((comments) => {

        this._commentsModel.setComments(comments, this._film.id);

        this._detailsComponent.setComments(comments);
        this._detailsComponent.rerender(this._film);
        this._recoveryDetailsListeners();
      })
      .catch((err) => {
        throw new Error(err);
      });
    }

  }

  getId() {
    return this._cardComponent.getFilm().id;
  }

  setDefaultView(evt) {
    this._closePopup(evt);
  }

  toggleCommentForm(boolean) {
    this._detailsComponent.toggleCommentForm(boolean);
  }

  shakeComment(commentIndex) {
    this._detailsComponent.shakeComment(commentIndex);
  }

  destroy() {
    removeComponent(this._cardComponent);

    if (this._detailsComponent) {
      removeComponent(this._detailsComponent);
    }
  }
}

export default CardController;
