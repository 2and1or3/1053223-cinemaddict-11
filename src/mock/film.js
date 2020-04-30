import {getRandomArray, getRandomInteger, getRandomDate} from '../utils.js';
import {generateComments} from './comment.js';
const POSTERS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];
const TITLES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`];
const DIRECTORS = [`Steven Spielberg`, `Alfred Hitchcock`, `Martin Scorsese`];
const CASTS = [`Charles Chaplin`, `Marlon Brando`, `Jack Nicholson`, `Daniel Day-Lewis`];
const SCENARISTS = [`Robert Towne`, `Quentin Tarantino`, `Francis Ford Coppola`];
const COUNTRIES = [`Russia`, `USA`, `China`, `Germany`, `France`];
const GENRES = [`Fantasy`, `Horror`, `Western`, `Romance`, `Thriller`, `Mystery`, `Detective`];
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];

const CARD_COUNT = 19;
const MAX_RATING = 10;
const MAX_AGE_LIMIT = 18;

const COMMENTS_LIMIT = 5;

const DURATION = {
  min: 60,
  max: 180,
};

const generateFilm = () => {
  const randomDate = getRandomDate();

  return {
    poster: POSTERS[Math.round(Math.random() * (POSTERS.length - 1))],
    title: TITLES[Math.round(Math.random() * (TITLES.length - 1))],
    originalTitle: TITLES[Math.round(Math.random() * (TITLES.length - 1))],
    rating: (Math.random() * MAX_RATING).toFixed(1),
    team: {
      director: DIRECTORS[Math.round(Math.random() * (DIRECTORS.length - 1))],
      scenarists: getRandomArray(SCENARISTS),
      cast: getRandomArray(CASTS),
    },
    date: randomDate,
    duration: getRandomInteger(DURATION.min, DURATION.max),
    country: COUNTRIES[Math.round(Math.random() * (COUNTRIES.length - 1))],
    genres: getRandomArray(GENRES),
    description: getRandomArray(DESCRIPTIONS).join(` `),
    ageLimit: getRandomInteger(0, MAX_AGE_LIMIT),
    comments: generateComments(getRandomInteger(0, COMMENTS_LIMIT)),
    isWatchList: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isWatched: Math.random() > 0.5
  };
};


const generateFilms = (count) => {
  const cards = [];

  for (let i = 0; i < count; i++) {
    cards.push(generateFilm());
  }

  return cards;
};

const filmsData = generateFilms(CARD_COUNT);

export {filmsData};
