import {createFilmsListExtraTemplate} from './components/films-extra.js';
import {createProfileTemplate} from './components/profile.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortTemplate} from './components/sort.js';
import {createCardTemplate} from './components/card.js';
import {createLoadButtonTemplate} from './components/load-button.js';
import {createDetailsPopuptemplate} from './components/details-popup.js';
import {createFooterStatisticTemplate} from './components/footer-statistic.js';

import {films as cards} from './mock/film.js';
import {generateFilters} from './mock/filter.js';

const CARDS_STEP = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;
const EXTRA_TOP = `Top rated`;
const EXTRA_MOST = `Most commented`;

const filters = generateFilters();
const cardsCount = cards.length;

const createContentContainer = function () {
  return `<section class="films"></section>`;
};

const createFilmsList = function () {
  return (
    `<section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
     </section>`);
};

const render = function (container, template, place = `beforeend`) {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);

render(header, createProfileTemplate(filters));

const main = document.querySelector(`.main`);

render(main, createMenuTemplate(filters));
render(main, createSortTemplate());

render(main, createContentContainer());

const content = main.querySelector(`.films`);
render(content, createFilmsList());
const films = content.querySelector(`.films-list`);
const filmsContainer = films.querySelector(`.films-list__container`);

let visibleCards = 0;

const loadCard = () => {
  const newVisibleCards = (visibleCards + CARDS_STEP) > cardsCount ? cardsCount : visibleCards + CARDS_STEP;

  for (let i = visibleCards; i < newVisibleCards; i++) {
    render(filmsContainer, createCardTemplate(cards[i]));
  }
  visibleCards = newVisibleCards;
};

loadCard();

render(films, createLoadButtonTemplate());

const loadButton = films.querySelector(`.films-list__show-more`);

loadButton.addEventListener(`click`, () => {
  loadCard();

  if (visibleCards >= cardsCount) {
    loadButton.remove();
  }
});


render(content, createFilmsListExtraTemplate(EXTRA_TOP));
const filmsTop = content.querySelectorAll(`.films-list--extra`)[0];
const filmsTopContainer = filmsTop.querySelector(`.films-list__container`);

for (let i = 0; i < TOP_CARD_COUNT; i++) {
  render(filmsTopContainer, createCardTemplate(cards[i]));
}

render(content, createFilmsListExtraTemplate(EXTRA_MOST));
const filmsMost = content.querySelectorAll(`.films-list--extra`)[1];
const filmsMostContainer = filmsMost.querySelector(`.films-list__container`);

for (let i = 0; i < MOST_CARD_COUNT; i++) {
  render(filmsMostContainer, createCardTemplate(cards[i]));
}

const footer = document.querySelector(`.footer`);
render(footer, createFooterStatisticTemplate(cards.length));

render(footer, createDetailsPopuptemplate(cards[0]), `afterend`);
const details = document.querySelector(`.film-details`);
details.style = `display: none`;
