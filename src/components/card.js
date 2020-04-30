import AbstractComponent from './abstract-component.js';
import {addListeners, yearCardFormat, durationFormat} from '../utils.js';

const DESCRIPTION_LENGTH = 139;
const DESCRIPTION_END = `…`;
const CONTROL_ACTIVE_CLASS = `film-card__controls-item--active`;
const createCardTemplate = function (film) {

  const {poster, title, rating, date, genres, description, comments, duration, isFavorite, isWatchList, isWatched} = film;

  const year = yearCardFormat(date);
  const filmDuration = durationFormat(duration);

  const isBigDescription = description.length > DESCRIPTION_LENGTH;
  const descriptionCover = (desc) => desc.slice(0, DESCRIPTION_LENGTH) + DESCRIPTION_END;

  let text = isBigDescription ? descriptionCover(description) : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${genres.join(`, `)}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${text}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button type="button" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchList ? CONTROL_ACTIVE_CLASS : ``}">Add to watchlist</button>
        <button type="button" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? CONTROL_ACTIVE_CLASS : ``}">Mark as watched</button>
        <button type="button" class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? CONTROL_ACTIVE_CLASS : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

class Card extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  getFilm() {
    return this._film;
  }

  setOpenClickHandlers(cb) {
    const poster = this.getElement().querySelector(`.film-card__poster`);
    const title = this.getElement().querySelector(`.film-card__title`);
    const comment = this.getElement().querySelector(`.film-card__comments`);
    addListeners(cb, poster, title, comment);
  }

  setWatchListClickHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, cb);
  }

  setHistoryClickHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, cb);
  }

  setFavoriteClickHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, cb);
  }
}

export default Card;
