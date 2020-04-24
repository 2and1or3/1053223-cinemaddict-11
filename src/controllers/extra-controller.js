import FilmsExtraComponent from '../components/films-extra.js';

import CardController from './card-controller.js';

import {render} from '../utils.js';


class ExtraController {
  constructor(container, title) {
    this._container = container;
    this._title = title;
    this._filmsExtraComponent = new FilmsExtraComponent(this._title);
  }

  render(films) {
    render(this._container, this._filmsExtraComponent);

    films.forEach((film) => {
      const cardController = new CardController(this._filmsExtraComponent.getInnerContainer());
      cardController.render(film);
    });
  }
}

export default ExtraController;
