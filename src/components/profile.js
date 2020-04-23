import AbstractComponent from './abstract-component.js';

const USER_STATUSES = [
  {
    title: `Movie Buff`,
    minStatusEdge: 21,
  },
  {
    title: `Fan`,
    minStatusEdge: 11,
  },
  {
    title: `Novice`,
    minStatusEdge: 1,
  },
  {
    title: ``,
    minStatusEdge: 0,
  },
];


const getUserStatus = (watchedQuantity) => {
  const userStatus = USER_STATUSES.find((status) => watchedQuantity >= status.minStatusEdge);

  return userStatus.title;
};

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
