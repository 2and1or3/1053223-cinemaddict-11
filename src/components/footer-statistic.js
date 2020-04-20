import {createElement} from '../utils.js';

const createFooterStatisticTemplate = function (quantity) {
  return (
    `<section class="footer__statistics">
        <p>${quantity} movies inside</p>
      </section>`
  );
};

class FooterStatistic {
  constructor(quantity) {
    this._quantity = quantity;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._quantity);
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

export default FooterStatistic;
