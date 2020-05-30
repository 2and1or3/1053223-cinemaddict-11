const FilterTypes = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITE: `favorite`,
};

const Errors = {
  INSTANCE: `Нельзя создавать экземпляры абстрактного класса`,
  IMPLEMENT_GET_TEMPLATE: `Метод getTemplate не имплементирован`,
  IMPLEMENT_RECOVERY_LISTENERS: `Метод recoveryListeners не имплементирован`,
};

const RenderMethods = {
  PREPEND: `prepend`,
  APPEND: `append`,
  AFTER: `after`,
};

const ScreenIds = {
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

export {FilterTypes, RenderMethods, Errors, ScreenIds, USER_STATUSES};
