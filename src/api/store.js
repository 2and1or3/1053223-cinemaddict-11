import FilmAdapter from '../models/film-adapter.js';

class Store {
  constructor(storageKey, storage) {
    this._storageKey = storageKey;
    this._storage = storage;
  }

  setItems(items) {
    const rawItems = items.map((item) => FilmAdapter.toRAWFilm(item));
    const rawString = JSON.stringify(rawItems);
    this._storage.setItem(this._storageKey, rawString);
  }

  getItems() {
    const rawString = this._storage.getItem(this._storageKey);
    const rawItems = JSON.parse(rawString);
    const localItems = FilmAdapter.parseFilms(rawItems);

    return localItems;
  }

  updateItem(newItem) {
    const id = newItem.id;

    const items = this.getItems();

    const targetIndex = items.findIndex((item) => item.id === id);

    items[targetIndex] = newItem;

    this.setItems(items);
  }
}

export default Store;
