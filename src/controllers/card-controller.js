import CardComponent from '../components/card.js';
import DetailsComponent from '../components/details-popup.js';

import {render, isEscPress, removeComponent} from '../utils.js';
import {RENDER_METHODS} from '../const.js';


class CardController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._cardComponent = null;
    this._detailsComponent = null;
    this._onEscPress = this._onEscPress.bind(this);
  }

  _onEscPress(evt) {
    evt.preventDefault();

    if (isEscPress(evt)) {
      this._closePopup(evt);
    }
  }

  _openPopup(evt) {
    evt.preventDefault();
    this._onViewChange(evt);
    this._detailsComponent.show();
    this._detailsComponent.setCloseClickHandler(this._closePopup.bind(this));
    document.addEventListener(`keydown`, this._onEscPress);
  }

  _closePopup(evt) {
    evt.preventDefault();
    this._detailsComponent.hide();
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  _recoveryListeners(film) {
    this._cardComponent.setOpenClickHandlers(this._openPopup.bind(this));
    this._cardComponent.setWatchListClickHandler(() => {
      const changedFilm = {
        isWatchList: !film.isWatchList,
      };

      const newFilm = Object.assign({}, film, changedFilm);
      this._onDataChange(newFilm);
    });
    this._cardComponent.setHistoryClickHandler(() => {
      const changedFilm = {
        isWatched: !film.isWatched,
      };

      const newFilm = Object.assign({}, film, changedFilm);
      this._onDataChange(newFilm, film, this);
    });

    this._cardComponent.setFavoriteClickHandler(() => {
      const changedFilm = {
        isFavorite: !film.isFavorite,
      };

      const newFilm = Object.assign({}, film, changedFilm);
      this._onDataChange(newFilm, film, this);
    });
  }

  render(film) {
    this._cardComponent = new CardComponent(film);
    this._detailsComponent = new DetailsComponent(film);

    render(this._container, this._cardComponent);

    this._recoveryListeners(film);
  }

  updateRender(film) {
    const newCardComponent = new CardComponent(film);
    this._detailsComponent = new DetailsComponent(film);
    render(this._cardComponent.getElement(), newCardComponent, RENDER_METHODS.AFTER);
    removeComponent(this._cardComponent);
    this._cardComponent = newCardComponent;
    this._recoveryListeners(film);
  }

  getId() {
    return this._cardComponent.getFilm()._innerId;
  }

  setDefaultView(evt) {
    this._closePopup(evt);
  }
}

export default CardController;
