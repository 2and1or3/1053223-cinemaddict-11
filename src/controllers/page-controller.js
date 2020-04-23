import LoadButtonComponent from '../components/load-button.js';
import ContentContainerComponent from '../components/content-container.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/films-list.js';

import CardController from './card-controller.js';
import ExtraController from './extra-controller.js';

import {render, removeComponent} from '../utils.js';

const CARDS_STEP = 5;
const EXTRA_TYPES = {
  TOP: `Top rated`,
  MOST: `Most commented`,
};


class PageController {
  constructor(container) {
    this._container = container;
    this._contentContainerComponent = new ContentContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._loadButtonComponent = new LoadButtonComponent();
  }

  render(films) {
    const quantityOfFilms = films.length;
    const isEmptyData = !quantityOfFilms;
    const extraFilmsData = {
      [EXTRA_TYPES.TOP]: [films[0], films[1]],
      [EXTRA_TYPES.MOST]: [films[0], films[1]],
    };

    render(this._container, this._contentContainerComponent);

    if (isEmptyData) {
      render(this._contentContainerComponent.getElement(), this._noFilmsComponent);
    } else {

      render(this._contentContainerComponent.getElement(), this._filmsListComponent);

      let visibleCards = 0;
      let addCardStep = () => visibleCards + CARDS_STEP;

      const loadMore = (begin, end) => {
        films
            .slice(begin, end)
            .forEach((film) => {
              const cardController = new CardController(this._filmsListComponent.getInnerContainer());
              cardController.render(film);
            });

        const difference = end - begin;
        visibleCards += difference;
      };

      loadMore(visibleCards, CARDS_STEP);

      const onLoadClick = (evt) => {
        evt.preventDefault();

        const isfilmsEnd = addCardStep() >= quantityOfFilms;

        const currentEnd = isfilmsEnd ? quantityOfFilms : addCardStep();

        loadMore(visibleCards, currentEnd);

        if (isfilmsEnd) {
          removeComponent(this._loadButtonComponent);
        }
      };


      render(this._contentContainerComponent.getElement(), this._loadButtonComponent);

      this._loadButtonComponent.setClickHandler(onLoadClick);


      const extraFilmsTypes = Object.keys(extraFilmsData);

      extraFilmsTypes.forEach((filmsType) => {
        const extraFilms = extraFilmsData[filmsType];
        const extraController = new ExtraController(this._contentContainerComponent.getElement(), filmsType);
        extraController.render(extraFilms);
      });
    }
  }
}

export default PageController;
