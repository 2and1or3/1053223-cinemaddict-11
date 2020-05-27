import FilmAdapter from '../models/film-adapter.js';

const MAIN_URL = `https://11.ecmascript.pages.academy/cinemaddict`;
const MOVIES_POSTFIX = `movies`;
const COMMENTS_POSTFIX = `comments`;
const SYNC_URL = `sync`;

const METHODS = {
  POST: `POST`,
  PUT: `PUT`,
  GET: `GET`,
  DELETE: `DELETE`,
};

const REQUEST_CODES = {
  OK: 200,
  REDIRECT: 300,
};

const checkStatus = (response) => {

  if (response.status >= REQUEST_CODES.OK && response.status < REQUEST_CODES.REDIRECT) {
    return response;
  } else {
    throw new Error(response.status);
  }
};

class API {
  constructor(token) {
    this._token = token;
  }

  _getRequest(headers, url = ``, method = METHODS.GET, body = null) {
    const resultUrl = url ? MAIN_URL + `/` + url : MAIN_URL;
    headers.append(`Authorization`, this._token);

    const options = {
      headers,
      method,
      body,
    };

    return fetch(resultUrl, options)
            .then(checkStatus);
  }

  getFilms() {
    const headers = new Headers();

    return this._getRequest(headers, MOVIES_POSTFIX)
            .then((response) => response.json())
            .then((films) => FilmAdapter.parseFilms(films))
            .catch((err) => {
              throw new Error(err);
            });
  }

  updateFilm(newFilm) {
    const headers = new Headers();
    headers.append(`Content-Type`, `application/json`);

    const url = MOVIES_POSTFIX + `/` + newFilm.id;

    newFilm = FilmAdapter.toRAWFilm(newFilm);
    const body = JSON.stringify(newFilm);

    return this._getRequest(headers, url, METHODS.PUT, body)
            .then((response) => response.json())
            .then((film) => FilmAdapter.parseFilm(film))
            .catch((err) => {
              throw new Error(err);
            });
  }

  getCommentsByFilmId(id) {
    const headers = new Headers();

    const url = COMMENTS_POSTFIX + `/` + id;

    return this._getRequest(headers, url)
            .then((response) => response.json())
            .then((comments) => FilmAdapter.parseComments(comments))
            .catch((err) => {
              throw new Error(err);
            });
  }

  addComment(filmId, newComment) {
    const headers = new Headers();
    headers.append(`Content-Type`, `application/json`);

    newComment = FilmAdapter.toRAWComment(newComment);
    const body = JSON.stringify(newComment);

    const url = COMMENTS_POSTFIX + `/` + filmId;

    return this._getRequest(headers, url, METHODS.POST, body)
            .then((response) => response.json())
            .then((filmAndComments) => {
              const localObj = {
                movie: FilmAdapter.parseFilm(filmAndComments.movie),
                comments: FilmAdapter.parseComments(filmAndComments.comments),
              };

              return localObj;
            })
            .catch((err) => {
              throw new Error(err);
            });
  }

  deleteComment(commentId) {
    const headers = new Headers();

    const url = COMMENTS_POSTFIX + `/` + commentId;

    return this._getRequest(headers, url, METHODS.DELETE)
            .then((response) => response.ok)
            .catch((err) => {
              throw new Error(err);
            });
  }

  sync(films) {
    const headers = new Headers();
    headers.append(`Content-Type`, `application/json`);

    const url = MOVIES_POSTFIX + `/` + SYNC_URL;

    films = films.map((film) => FilmAdapter.toRAWFilm(film));
    const body = JSON.stringify(films);

    return this._getRequest(headers, url, METHODS.POST, body)
            .then((response) => response.json())
            .catch((err) => {
              throw new Error(err);
            });
  }
}

export default API;
