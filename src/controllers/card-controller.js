import CardComponent from '../components/card.js';
import DetailsComponent from '../components/details-popup.js';

import {render, isEscPress, removeComponent} from '../utils.js';
import {RENDER_METHODS} from '../const.js';

const FILM_PROPERTIES = {
  IS_WATCHLIST: `isWatchList`,
  IS_FAVORITE: `isFavorite`,
  IS_WATCHED: `isWatched`,
};


class CardController {
  constructor(container, onDataChange, onViewChange, onCommentDelete, onCommentAdd) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentDelete = onCommentDelete;
    this._onCommentAdd = onCommentAdd;

    this._cardComponent = null;
    this._detailsComponent = null;

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

    this._detailsComponent.show();
    this._detailsComponent.setCloseClickHandler(this._closePopup);

    document.addEventListener(`keydown`, this._onEscPress);
  }

  _closePopup(evt) {
    evt.preventDefault();
    this._detailsComponent.hide();
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  _changeFilmState(property, film) {
    const changedFilm = {[property]: !film[property]};

    const newFilm = Object.assign({}, film, changedFilm);
    this._onDataChange(newFilm);
  }

  _recoveryListeners(film) {
    this._cardComponent.setOpenClickHandlers(this._openPopup);
    this._cardComponent.setWatchListClickHandler(() => this._changeFilmState(FILM_PROPERTIES.IS_WATCHLIST, film));
    this._cardComponent.setHistoryClickHandler(() => this._changeFilmState(FILM_PROPERTIES.IS_WATCHED, film));
    this._cardComponent.setFavoriteClickHandler(() => this._changeFilmState(FILM_PROPERTIES.IS_FAVORITE, film));

    this._detailsComponent.setWatchListClickHandler(() => this._changeFilmState(FILM_PROPERTIES.IS_WATCHLIST, film));
    this._detailsComponent.setHistoryClickHandler(() => this._changeFilmState(FILM_PROPERTIES.IS_WATCHED, film));
    this._detailsComponent.setFavoriteClickHandler(() => this._changeFilmState(FILM_PROPERTIES.IS_FAVORITE, film));

    this._detailsComponent.setDeleteCommentsHandler(this._onCommentDelete);
    this._detailsComponent.setAddCommentHandler(this._onCommentAdd);
  }

  render(film, comments) {

    this._cardComponent = new CardComponent(film);
    this._detailsComponent = new DetailsComponent(film, comments);

    render(this._container, this._cardComponent);

    this._recoveryListeners(film);
  }

  updateRender(film, comments) {
    const isOpened = document.querySelector(`.film-details`);

    removeComponent(this._detailsComponent);
    const newCardComponent = new CardComponent(film);
    this._detailsComponent = new DetailsComponent(film, comments);

    render(this._cardComponent.getElement(), newCardComponent, RENDER_METHODS.AFTER);
    removeComponent(this._cardComponent);

    this._cardComponent = newCardComponent;
    this._recoveryListeners(film);

    if (isOpened) {
      this._detailsComponent.show();
      this._detailsComponent.setCloseClickHandler(this._closePopup);
    }
  }

  getId() {
    return this._cardComponent.getFilm().id;
  }

  setDefaultView(evt) {
    this._closePopup(evt);
  }
}

export default CardController;
