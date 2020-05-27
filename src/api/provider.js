class Provider {
  constructor(api, storage) {
    this._api = api;
    this._storage = storage;
    this._isNeedSync = false;
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  getFilms() {
    if (this._isOnline()) {
      return this._api.getFilms()
                .then((films) => {
                  this._storage.setItems(films);

                  return Promise.resolve(films);
                });
    }

    return Promise.resolve(this._storage.getItems());
  }

  updateFilm(newFilm) {
    if (this._isOnline()) {
      return this._api.updateFilm(newFilm)
              .then((updateFilm) => {
                this._storage.updateItem(updateFilm);

                return Promise.resolve(updateFilm);
              });
    }

    this._isNeedSync = true;
    this._storage.updateItem(newFilm);

    return Promise.resolve(newFilm);
  }

  getCommentsByFilmId(id) {
    if (this._isOnline()) {
      return this._api.getCommentsByFilmId(id);
    }

    return Promise.resolve([]);
  }

  addComment(filmId, newComment) {
    if (this._isOnline()) {
      return this._api.addComment(filmId, newComment);
    }

    return Promise.reject(`offline`);
  }

  deleteComment(commentId) {
    if (this._isOnline()) {
      return this._api.deleteComment(commentId);
    }

    return Promise.reject(`offline`);
  }

  sync() {
    if (this._isNeedSync) {
      const localFilms = this._storage.getItems();

      this._api.sync(localFilms)
      .then((response) => {
        this._isNeedSync = false;
        const updatedFilms = response.updated;

        this._storage.setItems(updatedFilms);
      })
      .catch((err) => {
        throw new Error(err);
      });
    }
  }
}

export default Provider;
