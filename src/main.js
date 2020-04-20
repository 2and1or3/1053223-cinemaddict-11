import FilmsExtraComponent from './components/films-extra.js';
import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import CardComponent from './components/card.js';
import LoadButtonComponent from './components/load-button.js';
import DetailsComponent from './components/details-popup.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import ContentContainerComponent from './components/content-container.js';
import FilmsListComponent from './components/films-list.js';

import {render} from './utils.js';

import {films} from './mock/film.js';
import {generateFilters} from './mock/filter.js';

const CARDS_STEP = 5;
// const TOP_CARD_COUNT = 2;
// const MOST_CARD_COUNT = 2;

const EXTRA_TYPES = {
  TOP: `Top rated`,
  MOST: `Most commented`,
};

const extra = {
  [EXTRA_TYPES.TOP]: [films[0], films[1]],
  [EXTRA_TYPES.MOST]: [films[0], films[1]],
};

const filters = generateFilters();
const cardsCount = films.length;


const header = document.querySelector(`.header`);
render(header, new ProfileComponent().getElement());

const main = document.querySelector(`.main`);
render(main, new MenuComponent(filters).getElement());
render(main, new SortComponent().getElement());


const renderCard = (container, card) => {
  const cardComponent = new CardComponent(card);
  render(container, cardComponent.getElement());

  const openPopup = (evt) => {
    evt.preventDefault();
    container.append(detailsComponent.getElement());
    closeDetails.addEventListener(`click`, closePopup);
  };

  const closePopup = (evt) => {
    evt.preventDefault();
    detailsComponent.getElement().remove();
  };

  const addListeners = (cb, ...controls) => {
    controls.forEach((control) => {
      control.addEventListener(`click`, cb);
    });
  };

  const poster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const title = cardComponent.getElement().querySelector(`.film-card__title`);
  const comment = cardComponent.getElement().querySelector(`.film-card__comments`);
  addListeners(openPopup, poster, title, comment);

  const detailsComponent = new DetailsComponent(card);
  const closeDetails = detailsComponent.getElement().querySelector(`.film-details__close-btn`);
};

const renderExtra = (container, title, cards) => {
  const filmsExtraComponent = new FilmsExtraComponent(title);
  render(container, filmsExtraComponent.getElement());

  const filmsList = filmsExtraComponent.getElement().querySelector(`.films-list__container`);

  cards.forEach((card) => {
    renderCard(filmsList, card);
  });
};

const renderContent = (container, cards) => {
  const contentContainerComponent = new ContentContainerComponent();
  render(container, contentContainerComponent.getElement());

  const filmsListComponent = new FilmsListComponent();
  render(contentContainerComponent.getElement(), filmsListComponent.getElement());
  const filmList = filmsListComponent.getElement().querySelector(`.films-list__container`);

  let visibleCards = 0;

  const loadMore = (begin, end) => {
    cards
    .slice(begin, end)
    .forEach((card) => {
      renderCard(filmList, card);
    });

    const difference = end - begin;

    visibleCards += difference;
  };

  loadMore(visibleCards, CARDS_STEP);

  const onLoadClick = (evt) => {
    evt.preventDefault();

    const currentEnd = visibleCards + CARDS_STEP > cardsCount ? cardsCount : visibleCards + CARDS_STEP;

    loadMore(visibleCards, currentEnd);

    if (currentEnd >= cardsCount) {
      loadButtonComponent.getElement().remove();
      loadButtonComponent.removeElement();
    }
  };

  const loadButtonComponent = new LoadButtonComponent();
  render(contentContainerComponent.getElement(), loadButtonComponent.getElement());

  loadButtonComponent.getElement().addEventListener(`click`, onLoadClick);

  const extraKeys = Object.keys(extra);
  for (const key of extraKeys) {
    const extras = extra[key];
    renderExtra(contentContainerComponent.getElement(), key, extras);
  }
};

renderContent(main, films);

const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticComponent(cardsCount).getElement());
