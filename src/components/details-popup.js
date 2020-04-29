import AbstractSmartComponent from './abstract-smart-component.js';
import {dateCardFormat} from '../utils.js';

const EMOJI_SOURCE = {
  PREFIX: `images/emoji/`,
  POSTFIX: `.png`,
};

const getCommentTemplate = (comment) => {
  const {author, date, text, emotion} = comment;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const createGenreTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

const createDetailsPopuptemplate = function (film) {

  const {
    poster,
    ageLimit,
    title,
    originalTitle,
    rating,
    date,
    duration,
    country,
    genres,
    description,
    comments,
    isWatchList,
    isWatched,
    isFavorite,
    team: {
      director,
      scenarists,
      cast
    },
  } = film;

  const genreEnding = genres.length > 1 ? `s` : ``;
  const dateFormated = dateCardFormat(date);
  const commentsMarkup =
    comments
      .map((comment) => getCommentTemplate(comment))
      .join(`\n`);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageLimit}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${scenarists.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${cast.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dateFormated}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${genreEnding}</td>
                  <td class="film-details__cell">
                    ${genres.map(createGenreTemplate).join(`\n`)}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${isWatchList ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
            ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

class Details extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._isWatchList = film.isWatchList;
    this._isWatched = film.isWatched;
    this._isFavorite = film.isFavorite;
    this._currentEmotion = null;
    this._outerContainer = document.querySelector(`.films`);
  }

  getTemplate() {
    return createDetailsPopuptemplate(this._film);
  }

  setCloseClickHandler(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }


  _setWatchListClickHandler() {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, () => {
      this._isWatchList = !this._isWatchList;

    });
  }

  _setHistoryClickHandler() {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, () => {
      this._isWatched = !this._isWatched;
    });
  }

  _setFavoriteClickHandler() {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, () => {
      this._isFavorite = !this._isFavorite;
    });
  }

  _setCommentEmojiChangeHandler() {
    const container = this.getElement().querySelector(`.film-details__emoji-list`);
    const emojiHolder = this.getElement().querySelector(`.film-details__add-emoji-label img`);
    container.addEventListener(`change`, (evt) => {
      emojiHolder.setAttribute(`src`, `${EMOJI_SOURCE.PREFIX}${evt.target.value}${EMOJI_SOURCE.POSTFIX}`);
      emojiHolder.setAttribute(`alt`, `emoji-${evt.target.value}`);
      this._currentEmotion = evt.target.value;
    });
  }

  recoveryListeners() {
    this._setWatchListClickHandler();
    this._setHistoryClickHandler();
    this._setFavoriteClickHandler();
    this._setCommentEmojiChangeHandler();
  }

  getOuterContainer() {
    return this._outerContainer;
  }

  show() {
    if (this._outerContainer) {
      this._outerContainer.append(this.getElement());
      this.recoveryListeners();
    }
  }

  hide() {
    this.getElement().remove();
  }
}

export default Details;
