import AbstractComponent from './abstract-component.js';

const createFooterStatisticTemplate = (quantity) => {
  return (
    `<section class="footer__statistics">
        <p>${quantity} movies inside</p>
      </section>`
  );
};

class FooterStatistic extends AbstractComponent {
  constructor(quantity) {
    super();
    this._quantity = quantity;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._quantity);
  }
}

export default FooterStatistic;
