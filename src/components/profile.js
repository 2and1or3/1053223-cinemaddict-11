import {FILTER_TYPES} from '../const.js';
import {updateFilters} from '../mock/filter.js';

const USER_TYPES = [
  {
    title: ``,
    range: {
      min: -1,
      max: 0,
    }
  },
  {
    title: `Novice`,
    range: {
      min: 1,
      max: 10,
    }
  },
  {
    title: `Fan`,
    range: {
      min: 11,
      max: 20,
    }
  },
  {
    title: `Movie Buff`,
    range: {
      min: 21,
      max: Infinity,
    }
  },
];

const CURRENT_TYPE = `HISTORY`;

const counter = updateFilters();

const count = counter[FILTER_TYPES[CURRENT_TYPE]];

const getUserStatus = (quantity) => {
  let trueTitle = ``;

  USER_TYPES.forEach((obj) => {
    if (obj.range.min <= quantity && quantity <= obj.range.max) {
      trueTitle = obj.title;
    }
  });

  return trueTitle;
};

const createProfileTemplate = function () {
  const title = getUserStatus(count);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${title}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createProfileTemplate};
