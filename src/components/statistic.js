import AbstractSmartComponent from './abstract-smart-component.js';

import {render, getUserStatus, parsePrefixId} from '../utils.js';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const STATISTIC_FIELDS = {
  ALL_WATCHED: `allWatched`,
  ALL_DURATION: `allDuration`,
  FAVORITE_GENTER: `favoriteGenre`,
};

const GENRES_SET = {
  SCIFI: `Sci-Fi`,
  ANIMATION: `Animation`,
  COMEDY: `Comedy`,
  DRAMA: `Drama`,
  ACTION: `Action`,
  THRILLER: `Thriller`,
  FAMILY: `Family`,
  ADVENTURE: `Adventure`,
  HORROR: `Horror`,
};

const HOUR_DURATION = 60;

const BAR_HEIGHT = 50;

const PERIOD_PREFIX = `statistic-`;

const PERIOD_IDS = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const PERIODS = {
  [PERIOD_IDS.ALL_TIME]: {
    title: `All time`,
    range: ``,
  },
  [PERIOD_IDS.TODAY]: {
    title: `Today`,
    range: 1,
  },
  [PERIOD_IDS.WEEK]: {
    title: `Week`,
    range: 7,
  },
  [PERIOD_IDS.MONTH]: {
    title: `Month`,
    range: 31,
  },
  [PERIOD_IDS.YEAR]: {
    title: `Year`,
    range: 365,
  },
};

const chartOptions = {
  plugins: {
    datalabels: {
      font: {
        size: 20
      },
      color: `#ffffff`,
      anchor: `start`,
      align: `start`,
      offset: 40,
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: `#ffffff`,
        padding: 100,
        fontSize: 20
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
      barThickness: 24
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
    }],
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  }
};

const periodControlsMarkup = (id, currentPeriod) => {
  const title = PERIODS[id].title;
  const isChecked = id === currentPeriod ? `checked` : ``;

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${id}" value="${id}" ${isChecked}>
    <label for="statistic-${id}" class="statistic__filters-label">${title}</label>`
  );
};


const createStatisticTemplate = (statistic, currentPeriod) => {
  const {allWatched, allDuration, favoriteGenre} = statistic;

  const hours = Math.floor(allDuration / HOUR_DURATION);
  const minutes = allDuration - hours * HOUR_DURATION;

  const status = getUserStatus(allWatched.length);

  const periodKeys = Object.keys(PERIODS);

  const controlsMarkup = periodKeys
                         .map((key) => periodControlsMarkup(key, currentPeriod))
                         .join(`\n`);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${status}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${controlsMarkup}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${allWatched.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${favoriteGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

class Statistic extends AbstractSmartComponent {
  constructor(container, filmsModel) {
    super();
    this._container = container;
    this._filmsModel = filmsModel;

    this._currentPeriod = PERIOD_IDS.ALL_TIME;

    this._statistic = {
      [STATISTIC_FIELDS.ALL_WATCHED]: 0,
      [STATISTIC_FIELDS.ALL_DURATION]: 0,
      [STATISTIC_FIELDS.FAVORITE_GENTER]: ``,
    };

    this._genresCounts = [];
    const genresKeys = Object.values(GENRES_SET);
    genresKeys.forEach((key) => {
      const count = {
        title: key,
        count: 0,
      };

      this._genresCounts.push(count);
    });

    this._onDataChange = this._onDataChange.bind(this);
    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  _onDataChange() {
    this.render();
    this.hide();
  }

  _getWatched(films) {
    const watched = films.filter((film) => film.isWatched);

    return watched;
  }

  _getAllDuration(films) {
    const allDuration = films.reduce((duration, film) => duration + film.duration, 0);

    return allDuration;
  }

  _calculateGenres(films) {
    this._genresCounts.forEach((genreCount) => {
      genreCount.count = 0;
    });

    films.forEach((film) => {
      film.genres
      .forEach((genre) => {
        this._genresCounts
        .find((genreCount) => genreCount.title === genre)
        .count++;
      });
    });

    this._genresCounts.sort((left, right) => right.count - left.count);
  }

  _drawChart() {
    const statisticCtx = document.querySelector(`.statistic__chart`);

    const labels = this._genresCounts.map((count) => count.title);
    const counts = this._genresCounts.map((count) => count.count);

    statisticCtx.height = BAR_HEIGHT * this._genresCounts.length;

    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data: counts,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: chartOptions,
    });

    return myChart;
  }

  _isInPeriod(date) {
    if (this._currentPeriod === PERIOD_IDS.ALL_TIME) {
      return true;
    }

    const beginPeriod = moment().add(-PERIODS[this._currentPeriod].range, `days`);

    const isInPeriod = date >= beginPeriod;
    return isInPeriod;
  }

  _periodChangeHandler() {
    const container = this.getElement().querySelector(`.statistic__filters`);

    container.addEventListener(`click`, (evt) => {
      const isInput = evt.target.tagName === `INPUT`;
      const id = parsePrefixId(PERIOD_PREFIX, evt.target.id);
      const isActive = this._currentPeriod === id;

      if (isInput && !isActive) {
        this._currentPeriod = id;
        this.render();
      }
    });
  }

  getTemplate() {
    return createStatisticTemplate(this._statistic, this._currentPeriod);
  }

  render() {
    const films = this._filmsModel.getAllFilms();
    const filteredFilms = films.filter((film) => this._isInPeriod(new Date(film.watchDate)));

    this._statistic[STATISTIC_FIELDS.ALL_WATCHED] = this._getWatched(filteredFilms);
    this._statistic[STATISTIC_FIELDS.ALL_DURATION] = this._getAllDuration(filteredFilms);
    this._calculateGenres(this._statistic[STATISTIC_FIELDS.ALL_WATCHED]);
    this._statistic[STATISTIC_FIELDS.FAVORITE_GENTER] = this._genresCounts[0].count ? this._genresCounts[0].title : ``;

    if (!this._element) {
      render(this._container, this);
    } else {
      this.rerender();
    }

    this._drawChart();
    this._periodChangeHandler();
  }
}

export default Statistic;
