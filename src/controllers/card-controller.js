import CardComponent from '../components/card.js';
import DetailsComponent from '../components/details-popup.js';

import {render, isEscPress} from '../utils.js';


class CardController {
  constructor(container) {
    this._container = container;
    this._cardComponent = null;
    this._detailsComponent = null;
    this._onEscPress = null;
  }

  onEscPress(evt) {
    evt.preventDefault();

    if (isEscPress(evt)) {
      this.closePopup(evt);
    }
  }

  openPopup(evt) {
    evt.preventDefault();
    this._detailsComponent.show();
    this._detailsComponent.setClickHandler(this.closePopup.bind(this));
    document.addEventListener(`keydown`, this._onEscPress);
  }

  closePopup(evt) {
    evt.preventDefault();
    this._detailsComponent.hide();
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  render(film) {
    this._cardComponent = new CardComponent(film);
    this._detailsComponent = new DetailsComponent(film);
    this._onEscPress = this.onEscPress.bind(this);

    render(this._container, this._cardComponent);


    this._cardComponent.setClickHandler(this.openPopup.bind(this));
  }
}

export default CardController;
