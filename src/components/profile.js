import AbstractSmartComponent from './abstract-smart-component.js';

import {getUserStatus, render} from '../utils.js';
import {FilterTypes} from '../const.js';

const createProfileTemplate = function (profileHistory) {
  const {count} = profileHistory;
  const userStatus = getUserStatus(count);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userStatus}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class Profile extends AbstractSmartComponent {
  constructor(container, filmsModel) {
    super();
    this._container = container;
    this._filmsModel = filmsModel;
    this._user = {count: 0};

    this.render = this.render.bind(this);

    this._filmsModel.addDataChangeHandler(this.render);
  }

  getTemplate() {
    return createProfileTemplate(this._user);
  }

  render() {
    this._user.count = this._filmsModel.getFilms(FilterTypes.HISTORY).length;

    if (!this._element) {
      render(this._container, this);
    } else {
      this.rerender();
    }
  }
}

export default Profile;
