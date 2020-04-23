import CardComponent from '../components/card.js';
import DetailsComponent from '../components/details-popup.js';

import {render, isEscPress} from '../utils.js';


class CardController {
  constructor(container) {
    this._container = container;
    this._cardComponent = null;
    this._detailsComponent = null;
  }

  render(film) {
    this._cardComponent = new CardComponent(film);
    this._detailsComponent = new DetailsComponent(film);
    render(this._container, this._cardComponent);

    const onEscPress = (evt) => {
      evt.preventDefault();
      if (isEscPress(evt)) {
        closePopup(evt);
      }
    };

    const openPopup = (evt) => {
      evt.preventDefault();
      this._detailsComponent.show();
      this._detailsComponent.setClickHandler(closePopup);
      document.addEventListener(`keydown`, onEscPress);
    };

    const closePopup = (evt) => {
      evt.preventDefault();
      this._detailsComponent.hide();
      document.removeEventListener(`keydown`, onEscPress);
    };

    this._cardComponent.setClickHandler(openPopup);
  }
}

export default CardController;
