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

export {MONTH_NAMES, DATE_YEAR, FILTER_TYPES, RENDER_METHODS, ERRORS};
