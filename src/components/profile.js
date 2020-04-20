import {createElement} from '../utils.js';

import {FILTER_TYPES} from '../const.js';
import {updateFilters} from '../mock/filter.js';

const USER_TYPES = {
  [``]: {
    min: -1,
    max: 0,
  },
  'Novice': {
    min: 1,
    max: 10,
  },
  'Fan': {
    min: 11,
    max: 20,
  },
  'Movie Buff': {
    min: 21,
    max: Infinity,
  },
};

const DEFAULT_TYPE = FILTER_TYPES.HISTORY;

const counter = updateFilters();

const count = counter[FILTER_TYPES[DEFAULT_TYPE]];

const getUserStatus = (quantity) => {
  let status = ``;

  for (const title of Object.keys(USER_TYPES)) {
    if (USER_TYPES[title].min <= quantity && quantity <= USER_TYPES[title].max) {
      status = title;
    }
  }

  return status;
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

class Profile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate();
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

export default Profile;
