import AbstractSmartComponent from './abstract-smart-component.js';
import {dateDetailsFormat, durationFormat, dateCommentFormat} from '../utils.js';
import he from "he";

const EmojiSource = {
  PREFIX: `images/emoji/`,
  POSTFIX: `.png`,
  WIDTH: 55,
  HEIGHT: 55,
};

const KeySendCodes = {
  CTRL: 17,
  ENTER: 13,
};

const ButtonStates = {
  DELETE: {
    initial: `Delete`,
    inProcess: `Deleting...`,
  },
};

const REMOVE_DURATION = 600;

const isSendKeysPressed = (evt) => (evt.ctrlKey || evt.metakey) && (evt.keyCode === KeySendCodes.ENTER);

const getEmptyComment = () => {
  const now = new Date();
  const emptyComment = {
    text: ``,
    emotion: ``,
    author: `You`,
    date: now,
  };

  return emptyComment;
};

const getCommentTemplate = (comment) => {
  const {author, date, text, emotion} = comment;
  const commentDate = dateCommentFormat(date);

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete" type="button">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const createGenreTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

const createDetailsPopuptemplate = function (film, comments) {

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
  const dateFormated = dateDetailsFormat(date);
  const filmDuration = durationFormat(duration);
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
                  <td class="film-details__cell">${filmDuration}</td>
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

              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
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
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
    this._isWatchList = film.isWatchList;
    this._isWatched = film.isWatched;
    this._isFavorite = film.isFavorite;
    this._currentEmotion = null;
    this._outerContainer = document.querySelector(`.films`);
    this._emojiElement = null;

    this._addCommentsHandler = null;
  }

  _setCommentEmojiChangeHandler() {
    const container = this.getElement().querySelector(`.film-details__emoji-list`);
    const emojiHolder = this.getElement().querySelector(`.film-details__add-emoji-label`);

    container.addEventListener(`change`, (evt) => {
      if (!this._emojiElement) {
        this._emojiElement = document.createElement(`img`);
        this._emojiElement.width = EmojiSource.WIDTH;
        this._emojiElement.height = EmojiSource.HEIGHT;
        emojiHolder.append(this._emojiElement);
      }

      this._emojiElement.setAttribute(`src`, `${EmojiSource.PREFIX}${evt.target.value}${EmojiSource.POSTFIX}`);
      this._emojiElement.setAttribute(`alt`, `emoji-${evt.target.value}`);
      this._currentEmotion = evt.target.value;
    });
  }

  _resetFields() {
    const container = this.getElement().querySelector(`.film-details__new-comment`);
    container.classList.remove(`shake`);
    const textField = container.querySelector(`.film-details__comment-input`);
    textField.value = ``;

    const currentEmotionInput = container.querySelector(`.film-details__emoji-item:checked`);
    if (currentEmotionInput) {
      currentEmotionInput.checked = false;
    }

    const emotionField = container.querySelector(`.film-details__add-emoji-label img`);

    if (emotionField) {
      this._emojiElement = null;
      this._currentEmotion = null;
      emotionField.remove();
    }
  }

  _recoveryListeners() {
    this._setCommentEmojiChangeHandler();
  }

  getTemplate() {
    return createDetailsPopuptemplate(this._film, this._comments);
  }

  setCloseClickHandler(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }

  setWatchListClickHandler(cb) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, () => {
      this._isWatchList = !this._isWatchList;
      cb();
    });
  }

  setHistoryClickHandler(cb) {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, () => {
      this._isWatched = !this._isWatched;
      cb();
    });
  }

  setFavoriteClickHandler(cb) {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, () => {
      this._isFavorite = !this._isFavorite;
      cb();
    });
  }

  setDeleteCommentsHandler(cb) {
    const comments = this.getElement().querySelectorAll(`.film-details__comment`);

    Array.from(comments)
         .forEach((comment, index, arr) => {
           const deleteButton = comment.querySelector(`.film-details__comment-delete`);

           comment.addEventListener(`click`, (evt) => {
             if (evt.target === deleteButton) {
               deleteButton.textContent = ButtonStates.DELETE.inProcess;
               deleteButton.disabled = true;

               arr.forEach((targetComment) => {
                 const targetDeleteButton = targetComment.querySelector(`.film-details__comment-delete`);
                 targetDeleteButton.disabled = true;
               });

               cb(this._film, index);
             }
           });
         });
  }

  setAddCommentHandler(cb) {
    this._addCommentsHandler = cb;

    const onKeyDown = (evt) => {
      const isAllPressed = isSendKeysPressed(evt);

      if (isAllPressed) {
        const newComment = getEmptyComment();
        const container = this.getElement().querySelector(`.film-details__new-comment`);
        const newText = container.querySelector(`.film-details__comment-input`).value;
        const newEmotion = this._currentEmotion;

        const isEmpty = !(newText && newEmotion);

        if (!isEmpty) {
          newComment.text = he.encode(newText);
          newComment.emotion = newEmotion;

          this.toggleCommentForm(true);
          cb(this._film, newComment);

          document.removeEventListener(`keydown`, onKeyDown);
        }
      }
    };

    document.addEventListener(`keydown`, onKeyDown);
  }

  show() {
    if (this._outerContainer) {
      this._outerContainer.append(this.getElement());
      this.rerender(this._film);
    }
  }

  hide() {
    this._resetFields();
    this.getElement().remove();
  }

  toggleCommentForm(boolean) {
    this._resetFields();
    const textField = this.getElement().querySelector(`.film-details__comment-input`);
    textField.disabled = boolean;

    const emojies = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    emojies.forEach((emoji) => {
      emoji.disabled = boolean;
    });

    if (!boolean) {
      this.getElement().querySelector(`.film-details__new-comment`).classList.add(`shake`);
      this.setAddCommentHandler(this._addCommentsHandler);
    }
  }

  shakeComment(commentIndex) {
    const currentComment = this.getElement().querySelectorAll(`.film-details__comment`)[commentIndex];

    const deleteButton = currentComment.querySelector(`.film-details__comment-delete`);
    deleteButton.disabled = false;
    deleteButton.textContent = ButtonStates.DELETE.initial;

    currentComment.classList.add(`shake`);

    setTimeout(() => {
      currentComment.classList.remove(`shake`);
    }, REMOVE_DURATION);
  }

  setComments(comments) {
    this._comments = comments;
  }

  rerender(updatedFilm) {
    this._film = updatedFilm;
    super.rerender();
    this._recoveryListeners();
  }
}

export default Details;
