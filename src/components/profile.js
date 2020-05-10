import AbstractComponent from './abstract-component.js';

import {getUserStatus} from '../utils.js';

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

class Profile extends AbstractComponent {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createProfileTemplate(this._user);
  }
}

export default Profile;
