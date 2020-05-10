const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const DATE_YEAR = {
  min: 1970,
  max: 2020,
};

const FILTER_TYPES = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITE: `favorite`,
};

const ERRORS = {
  INSTANCE: `Нельзя создавать экземпляры абстрактного класса`,
  IMPLEMENT_GET_TEMPLATE: `Метод getTemplate не имплементирован`,
  IMPLEMENT_RECOVERY_LISTENERS: `Метод recoveryListeners не имплементирован`,
};

const RENDER_METHODS = {
  PREPEND: `prepend`,
  APPEND: `append`,
  AFTER: `after`,
};

const SCREEN_IDS = {
  STATISTIC: `statistic`,
  CARDS: `cards`,
};

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

export {MONTH_NAMES, DATE_YEAR, FILTER_TYPES, RENDER_METHODS, ERRORS, SCREEN_IDS, USER_STATUSES};
