import {createElement} from '../utils.js';

const DESCRIPTION_LENGTH = 139;
const DESCRIPTION_END = `…`;
const createCardTemplate = function (film) {

  const {poster, title, rating, date, genres, description, comments, duration} = film;

  const year = date.slice(-4);

  let text = description.length > DESCRIPTION_LENGTH ? description.slice(0, DESCRIPTION_LENGTH) + DESCRIPTION_END : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres.join(`, `)}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${text}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

class Card {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Card;
