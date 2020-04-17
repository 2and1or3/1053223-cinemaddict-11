const createFooterStatisticTemplate = function (quantity) {
  return (
    `<section class="footer__statistics">
        <p>${quantity} movies inside</p>
      </section>`
  );
};

export {createFooterStatisticTemplate};
